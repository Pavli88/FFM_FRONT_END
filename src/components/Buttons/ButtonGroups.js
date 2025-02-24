import {useState} from "react";

export const ButtonGroupVertical = ({ buttonDict }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="button-group-vertical" style={{padding: 10, height: '100%'}}>
      {Object.entries(buttonDict).map(([name, onClick], index) => (
        <button
          key={index}
          className={selected === index ? "button selected-button-vertical" : "button"}
          onClick={() => {
            setSelected(index);
            onClick();
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};