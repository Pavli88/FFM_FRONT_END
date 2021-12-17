import RobotTrades from "./RobotTrades";

const RobotTransactionsPage = (props) => {
    return (
        <>
            <RobotTrades robot={props.robot} start_date={props.start_date} end_date={props.end_date} server={props.server}/>
        </>
    );
};

export default RobotTransactionsPage;