import React, { useState } from "react";
import "./Box.css";

function Box(props) {
  const [visible, setVisible] = useState("visible");

  let style = {
    width: props.width,
    height: props.height,
    backgroundColor: props.color,
    visibility: visible,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setVisible("hidden");
  };

  return (
    <div style={style} className="Box" key={props.id}>
      <form onSubmit={handleSubmit} style={{ float: "right" }}>
        <button type="submit">X</button>
      </form>
    </div>
  );
}

export default Box;
