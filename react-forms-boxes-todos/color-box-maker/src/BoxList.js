import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList() {
  const [boxes, setBoxes] = useState([]);
  //let boxes = [];

  function addBox(width, height, color) {
    //console.table(width, height, color);
    setBoxes((boxes) => [
      ...boxes,
      <Box
        width={Number(width)}
        height={Number(height)}
        color={color}
        key={boxes.length}
      ></Box>,
    ]);
  }

  //   addBox(100, 100, "green");

  return (
    <div className="BoxList">
      <h2>BoxList</h2>
      <NewBoxForm addBox={addBox}></NewBoxForm>
      {boxes}
    </div>
  );
}

export default BoxList;
