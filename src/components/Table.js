const TableHeaderGenerator = (props) => {

    const tableHeaderList = props.list.map((data) =>
        <td>{data}</td>);

    return (
        <thead>
            <tr>
                {tableHeaderList}
            </tr>
        </thead>
    );
};

export default TableHeaderGenerator;