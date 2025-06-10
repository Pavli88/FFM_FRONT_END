import {useContext, useState} from "react";
import DashboardContext from "../../../../context/dashboard-context";
import { BsHouse, BsFolder2Open, BsFileEarmark, BsArrowRepeat, BsDash, BsPlus, BsTrash } from 'react-icons/bs';
import './PortGroupNode.css'


const PortGroupNode = ({ node, onRightClick, onDelete, onAddChild }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const { setPortGroup } = useContext(DashboardContext);

  const handleRightClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onRightClick(event, node);
  };

  const borderColor =
    node.portfolio_type === 'Business'
      ? 'green'
      : node.portfolio_type === 'Portfolio Group'
      ? 'orange'
      : node.portfolio_type === 'Portfolio'
      ? 'blue'
      : '#ccc';

  // Ikon típus logika
  const getNodeIcon = () => {
    const isRoot = !node.parent_id || node.parent_id === 0;
    if (isRoot) return <BsHouse />;
    if (hasChildren) return <BsFolder2Open />;
    return <BsFileEarmark />;
  };

  return (
    <div className="port-group-node" onContextMenu={handleRightClick}>
      <div
        className="port-group-node-box"
        style={{ borderRight: `2px solid ${borderColor}` }}
      >
        <div
          className="port-group-node-content"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="port-group-node-left">
            <div className="port-group-node-expand">
              {hasChildren && (expanded ? <BsDash /> : <BsPlus />)}
            </div>
            <div className="port-group-node-icon" style={{ paddingRight: 6 }}>
              {getNodeIcon()}
            </div>
            <label className="port-group-node-label">{node.name}</label>
            <div className="port-group-node-currency">{node.currency}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="icon-button">
              <BsArrowRepeat
                style={{ cursor: 'pointer', fontSize: 20 }}
                onClick={() => setPortGroup(node.portfolio_code)}
              />
            </button>

            {node.portfolio_type === 'Business' ||
            node.portfolio_type === 'Portfolio Group' ? (
              <button className="icon-button">
                <BsPlus
                  style={{ cursor: 'pointer', fontSize: 20 }}
                  onClick={() => onAddChild(node)}
                />
              </button>
            ) : (
              <button className="icon-button">
                <BsTrash
                  style={{ cursor: 'pointer', fontSize: 20 }}
                  onClick={() => onDelete(node)}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="port-group-node-children">
          {node.children.map((child) => (
            <PortGroupNode
              key={child.id}
              node={child}
              onRightClick={onRightClick}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default PortGroupNode;