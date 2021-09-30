const ListGenerator = (props) =>{
    const list = props.numbers;
    const listItems = list.map((number) =>
        <li>{number}</li>
    );

    return (
        <ul>{listItems}</ul>
    );
};

export default ListGenerator;