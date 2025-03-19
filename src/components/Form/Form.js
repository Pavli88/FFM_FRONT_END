const Form = ({ onSubmit, children, className = "" }) => {
  return (
    <form onSubmit={onSubmit} className={`form ${className}`} autoComplete="off">
      {children}
    </form>
  );
};

export default Form;
