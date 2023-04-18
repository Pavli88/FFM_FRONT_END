import {BsDash, BsPlus} from "react-icons/bs";

const PlusMinusButtonGroup = (props) => {
    const saveRecords = () => {
        props.save();
    };
    const deleteRecord = () => {
        props.delete();
    };
    return (
        <div style={{display: 'flex', position: "absolute", right: 5}}>
            <div style={{padding: 5}}>
                <button className={'plus-minus-buttons'} onClick={saveRecords}><BsPlus
                    style={{fontSize: 24}}/></button>
            </div>
            <div style={{padding: 5}}>
                <button className={'plus-minus-buttons'} onClick={deleteRecord}><BsDash
                    style={{fontSize: 24}}/>
                </button>
            </div>
        </div>
    )
};
export default PlusMinusButtonGroup;