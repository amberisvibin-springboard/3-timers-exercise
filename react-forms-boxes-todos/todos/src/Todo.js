import React, { useState } from "react";
import "./Todo.css";

function Todo(props) {
  const [visible, setVisible] = useState("visible");

  let style = {
    visibility: visible,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setVisible("hidden");
  };

  return (
    <div style={style} className="Todo" key={props.id}>
      <p>{props.task}</p>
      <form onSubmit={handleSubmit} style={{ float: "right" }}>
        <button type="submit">X</button>
      </form>
    </div>
  );
}

export default Todo;
