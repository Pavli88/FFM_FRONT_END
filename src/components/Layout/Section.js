const Section = ({ title, children }) => (
    <div style={{ marginBottom: 15 }}>
        <p>{title}</p>
        <div>{children}</div>
    </div>
);
export default Section;