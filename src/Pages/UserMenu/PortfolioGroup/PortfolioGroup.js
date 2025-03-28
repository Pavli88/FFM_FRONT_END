import {BsDash, BsPlus, BsTrash, BsArrowRepeat} from "react-icons/bs";
import {useContext, useEffect, useRef, useState} from "react";
import DashboardContext from "../../../context/dashboard-context";
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

const TreeNode = ({ node, onRightClick, onDelete, onAddChild }) => {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;
    const { setPortGroup } = useContext(DashboardContext);

    const handleRightClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onRightClick(event, node);
    };

    const borderColor = node.portfolio_type === "Business" ? "green" :
                        node.portfolio_type === "Portfolio Group" ? "orange" :
                        node.portfolio_type === "Portfolio" ? "blue" : "#ccc";

    return (
        <div style={{ marginLeft: 10, marginTop: 5 }} onContextMenu={handleRightClick}>
            <div style={{ padding: "2px", backgroundColor: "#f1f1f1", borderRight: `2px solid ${borderColor}`, borderRadius: 5 }}>
                <div onClick={() => setExpanded(!expanded)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <div style={{ width: 20, textAlign: "center" }}>
                            {hasChildren && (expanded ? <BsDash/> : <BsPlus/>)}
                        </div>
                        <label style={{ flex: 2, paddingLeft: 10 }}>{node.name}</label>
                        <div style={{ flex: 1, paddingLeft: 10, fontSize: "0.9em", color: "#555" }}>{node.currency}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button className={'icon-button'}>
                            <BsArrowRepeat style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => setPortGroup(node.portfolio_code)}/>
                        </button>

                        {node.portfolio_type === "Business" || node.portfolio_type === "Portfolio Group" ? (
                            <button className={'icon-button'}>
                                 <BsPlus style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => onAddChild(node)} />
                            </button>

                        ) : (
                            <button className={'icon-button'}>
                                 <BsTrash style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => onDelete(node)} />
                            </button>

                        )}
                    </div>
                </div>
            </div>
            {hasChildren && expanded && (
                <div style={{ marginLeft: 20, borderLeft: "1px solid #ccc", paddingLeft: "10px" }}>
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} onRightClick={onRightClick} onDelete={onDelete} onAddChild={onAddChild} />
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

    const handleRightClick = (event, node) => {
        event.preventDefault();
        setSelectedNode(node);
        setContextMenu({ visible: true, x: event.clientX, y: event.clientY });
    };

    const handleDelete = async (node) => {
        const response = await fetchAPI.post("portfolios/delete/port_group/", { id: node.id });
        if (response.data.success) update(node.id);
        else alert(response.data.message);
    };

    const handleAddChild = (node) => {
        setSelectedNode(node);
        setAddModalShow(true);
    };

    return (
        <div onClick={() => setContextMenu(null)} style={{ position: "relative", height: "100%", padding: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            {data.map((node) => (
                <TreeNode key={node.id} node={node} onRightClick={handleRightClick} onDelete={handleDelete} onAddChild={handleAddChild} />
            ))}
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
        <div style={{padding: 20, width: '100%'}}>
            <div className="card-header" style={{ fontSize: "1.2em", fontWeight: "bold", paddingBottom: "10px", borderBottom: "2px solid #ccc" }}>Portfolios Structure</div>
            <div style={{ overflowY: "auto", height: "100%" }}>
                <TreeView data={treeData} update={(e) => setNode(e)} allowSelect={allowSelect} />
            </div>
        </div>
    );
};


export default PortfolioGroup;