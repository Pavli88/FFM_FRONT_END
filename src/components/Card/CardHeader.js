import "./Card.css"
const CardHeader = ( {title, content} ) => {
    return (
        <div className={'card-header'}>
            <label>{title}</label>
            {content}
        </div>
    )
};
export default CardHeader;