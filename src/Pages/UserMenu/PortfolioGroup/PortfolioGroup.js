import {BsDash, BsPlus} from "react-icons/bs";
import {useContext, useEffect, useRef, useState} from "react";
import ServerContext from "../../../context/server-context";
import DashboardContext from "../../../context/dashboard-context";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import fetchAPI from "../../../config files/api";

const AddModal = (props) => {
    const [response, setResponse] = useState(null);
    const idRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetchAPI.post('portfolios/group/add/', {
                portfolio_id: idRef.current.value,
                parent_id: props.data.id
            })
            if (response.data.success) {
                props.hide();
            }
        } catch (error) {
            if (error.response.status === 409) {
                setResponse(error.response.data);
            } else if (error.request) {
                // Handle other errors (e.g., network issues or server errors)
                console.error('Anx error occurred:', error);
                // setResponse({ error: 'An unexpected error occurred. Please try again.' });
            }
        }
    };
    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Portfolio To {props.data.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type={'number'} ref={idRef}/>
                {response !== null && <div className={'message-box'}>
                    {response.message}
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <button className={'save-button'} onClick={submitHandler}>Add to group</button>
            </Modal.Footer>
        </Modal>
    )
};

const TreeNode = ({ node, onRightClick }) => {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const handleRightClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onRightClick(event, node);
    };

    return (
        <div
            style={{ marginLeft: 10, marginTop: 5 }}
            onContextMenu={handleRightClick}
            className={
                node.portfolio_type === "Business" || node.portfolio_type === "Portfolio Group"
                    ? "tree-node-parent"
                    : "tree-node-child"
            }
        >
            <div onClick={() => setExpanded(!expanded)} style={{display: "flex", alignItems: "center"}}>
                <div style={{width: 20, textAlign: "center"}}>
                    {hasChildren && (expanded ? <BsDash/> : <BsPlus/>)}
                </div>
                <div style={{flex: 1, paddingLeft: 10}}>{node.name}</div>
                <div style={{flex: 1, paddingLeft: 10, fontSize: "0.9em", color: "#555"}}>
                    {node.portfolio_code}
                </div>
                <div style={{flex: 1, paddingLeft: 20, fontSize: "0.9em", color: "#555"}}>
                    {node.portfolio_type}
                </div>
            </div>

            {hasChildren && expanded && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} onRightClick={onRightClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

const TreeView = ({ data, update, allowSelect = false }) => {
    const [contextMenu, setContextMenu] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [addModalShow, setAddModalShow] = useState(false);
    const { setPortGroup } = useContext(DashboardContext);
    const handleRightClick = (event, node) => {
        event.preventDefault();
        setSelectedNode(node);
        setContextMenu({ visible: true, x: event.clientX, y: event.clientY });
    };

    const handleMenuClick = async (action) => {
        if (action === "delete") {
            const response = await fetchAPI.post("portfolios/delete/port_group/",
                {id: selectedNode.id});
            if (response.data.success) update(selectedNode.id);
            else alert(response.data.message);
        } else if (action === "add-child") {
            setAddModalShow(true);
        } else if (action === "load") {
            setPortGroup(selectedNode.portfolio_code)
            // alert(`Loading portfolio: ${selectedNode.portfolio_code}`); // Placeholder for load functionality
        }
        setContextMenu(null);
    };

    const handleOutsideClick = () => setContextMenu(null);

    return (
        <div onClick={handleOutsideClick} style={{ position: "relative", height: "100%" }}>
            {/*<div style={{ display: "flex", paddingBottom: 10, fontWeight: "bold", borderBottom: "1px solid #ccc" }}>*/}
            {/*    <div style={{ flex: 1 }}>Portfolio Name</div>*/}
            {/*    <div style={{ flex: 1, paddingLeft: 20 }}>Portfolio Code</div>*/}
            {/*</div>*/}

            {data.map((node) => (
                <TreeNode key={node.id} node={node} onRightClick={handleRightClick} />
            ))}

            {contextMenu?.visible && (
                <ul
                    style={{
                        position: "absolute",
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        padding: "10px",
                        listStyleType: "none",
                        zIndex: 100,
                        borderRadius: 10,
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {allowSelect && <li onClick={() => handleMenuClick("load")}>Load</li>}
                    {(selectedNode?.portfolio_type === "Business" || selectedNode?.portfolio_type === "Portfolio Group") && (
                        <>

                            <li onClick={() => handleMenuClick("add-child")}>Add Child</li>
                        </>
                    )}
                    <li onClick={() => handleMenuClick("delete")}>Delete Node</li>
                </ul>
            )}

            {selectedNode !== null && (
                <AddModal
                    show={addModalShow}
                    hide={() => {
                        setAddModalShow(false);
                        update(selectedNode.id);
                    }}
                    data={selectedNode}
                />
            )}
        </div>
    );
};

const PortfolioGroup = ({ allowSelect = false }) => {
    const [portGroupData, setPortGroupData] = useState([]);
    const [node, setNode] = useState(null);

    const fetchPortGroupData = async () => {
        const response = await fetchAPI.get('portfolios/get/port_groups/');
        setPortGroupData(response.data);
    };

    useEffect(() => {
        fetchPortGroupData();
    }, [node]);

    const buildTree = (data, parentId = 0) => {
        return data
            .filter((item) => item.parent_id === parentId)
            .map((item) => ({ ...item, children: buildTree(data, item.id) }));
    };

    const treeData = buildTree(portGroupData);

    return (
        <div className={"card"}>
            <div className={"card-header"}>Portfolios Structure</div>
            <div style={{ overflow: "scroll", height: "100%" }}>
                <TreeView data={treeData} update={(e) => setNode(e)} allowSelect={allowSelect}/>
            </div>
        </div>
    );
};

export default PortfolioGroup;