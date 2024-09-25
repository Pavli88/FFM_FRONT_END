import PlusMinusButtonGroup from "../../../components/PlusMinusButtonGroup/PlusMinusButtonGroup";
import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import {BsDash, BsPlus, BsDiagram3} from "react-icons/bs";
import NewPortfolio from "../ProfilePortfolios/NewPortfolio";
import {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../../context/user-context";
import ServerContext from "../../../context/server-context";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DateContext from "../../../context/date-context";
import Card from "react-bootstrap/Card";

const TreeNode = ({node, onRightClick}) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    const handleRightClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onRightClick(event, node);  // Pass the right-click event and node to the parent
    };

    return (
        <div style={{marginLeft: 10, marginRight: 10, marginTop: 10}}
             onContextMenu={handleRightClick}
             className={node.portfolio_type === 'Business' || node.portfolio_type === 'Portfolio Group' ? 'tree-node-parent' : 'tree-node-child'}>
            <div onClick={() => setExpanded(!expanded)} style={{display: "flex"}}>
                <div style={{paddingLeft: 20}}>
                    {hasChildren && (expanded ? <BsDash/> : <BsPlus/>)}
                </div>
                <div style={{paddingLeft: 20}}>
                    {node.name}
                </div>
                {/*<div style={{paddingLeft: 20}}>*/}
                {/*    {node.portfolio_type}*/}
                {/*</div>*/}
                {/*<div style={{paddingLeft: 20}}>*/}
                {/*    {node.portfolio_code}*/}
                {/*</div>*/}
            </div>
            {hasChildren && expanded && (
                <div>
                    {node.children.map(child => (
                        <TreeNode key={child.id} node={child} onRightClick={onRightClick}/>
                    ))}
                </div>
            )}
        </div>
    );
};

const TreeView = ({data, update}) => {
    const server = useContext(ServerContext)['server'];
    const [contextMenu, setContextMenu] = useState(null);  // Manage context menu state
    const [selectedNode, setSelectedNode] = useState(null);  // Track which node is selected
    const [addModalShow, setAddModalShow] = useState(false);

    // Function to handle the right-click and show the context menu
    const handleRightClick = (event, node) => {
        event.preventDefault();
        setSelectedNode(node);  // Set the clicked node as the selected node
        setContextMenu({
            visible: true,
            x: event.clientX,
            y: 100
        });
    };

    // Function to handle context menu option clicks
    const handleMenuClick = async (action) => {
        if (action === 'delete') {
            const response = await axios.post(server + 'portfolios/delete/port_group/', {
                id: selectedNode.id
            })
            if (response.data.success) {
                update(selectedNode.id);
            } else {
                alert(response.data.message);
            };

        } else if (action === 'add-child') {
            // Handle add child node logic
            setAddModalShow(true);
        }
        setContextMenu(null);  // Close the context menu
    };

    // Close context menu when clicking outside
    const handleOutsideClick = () => {
        setContextMenu(null);
    };

    return (
        <div onClick={handleOutsideClick} style={{position: 'relative', height: '100%'}}>
            {data.map(node => (
                <TreeNode key={node.id} node={node} onRightClick={handleRightClick}/>
            ))}

            {contextMenu?.visible && (
                <ul
                    style={{
                        position: 'absolute',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        padding: '10px',
                        listStyleType: 'none',
                        zIndex: 100,
                        borderRadius: 10
                    }}
                    onClick={(e) => e.stopPropagation()}  // Prevent clicking inside from closing the menu
                >
                    {(selectedNode?.portfolio_type === 'Business' || selectedNode?.portfolio_type === 'Portfolio Group') && (
                        <li onClick={() => handleMenuClick('add-child')}>Add Child</li>)}
                    <li onClick={() => handleMenuClick('delete')}>Delete Node</li>
                </ul>
            )}
            {selectedNode !== null &&
                <AddModal
                    show={addModalShow}
                    hide={() => {
                        setAddModalShow(false);
                        update(selectedNode.id);
                    }}
                    data={selectedNode}/>}
        </div>
    );
};

const AddModal = (props) => {
    const server = useContext(ServerContext)['server'];
    const [response, setResponse] = useState(null);
    const idRef = useRef();
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(server + 'portfolios/group/add/', {
                portfolio_id: idRef.current.value,
                parent_id: props.data.id
            })
            if (response.data.success) {
                props.hide();
            }
        } catch (error) {
            if (error.response.status === 409) {
                setResponse(error.response.data);
            } else if (error.request){
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

const PortfolioGroup = () => {
    const server = useContext(ServerContext)['server'];
    const [portGroupDate, setPortGroupData] = useState([]);
    const [node, setNode] = useState(null);

    const fetchPortGroupData = async () => {
        const response = await axios.get(server + 'portfolios/get/port_groups/');
        setPortGroupData(response.data);
        console.log(response.data)
    };

    useEffect(() => {
        fetchPortGroupData();
    }, [node]);

    const data = [
        {id: 1, name: 'Parent 1', parent_id: 0},
        {id: 2, name: 'Child 1.1', parent_id: 1},
        {id: 3, name: 'Child 1.2', parent_id: 1},
        {id: 4, name: 'Parent 2', parent_id: 0},
        {id: 5, name: 'Child 2.1', parent_id: 4},
        {id: 6, name: 'Child 2.2', parent_id: 4},
        {id: 7, name: 'Subchild 1.2.1', parent_id: 3},
    ];

    const buildTree = (data, parentId = 0) => {
        return data
            .filter(item => item.parent_id === parentId)
            .map(item => ({
                ...item,
                children: buildTree(data, item.id)
            }));
    };

    const treeData = buildTree(portGroupDate);

    return (
        <div className={'card'}>
            <div className={'card-header'}>
                Portfolio Relationships
            </div>
            <div style={{overflow: "scroll", height: '100%'}}>
                <TreeView data={treeData} update={(e)=>setNode(e)}/>
            </div>
        </div>
    )
};
export default PortfolioGroup;