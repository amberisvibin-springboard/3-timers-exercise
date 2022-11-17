import React, { useState } from "react";
import { getRandom } from "./random";

function EightBall(props) {
  const [msg, setMsg] = useState("Think of a Question");
  const [color, setColor] = useState("black");

  function getAnswer() {
    let answer = props.answers[getRandom(props.answers.length)];
    //console.log(answer);
    setMsg(answer.msg);
    setColor(answer.color);
  }

  return (
    <div>
      <h1>Eight Ball</h1>
      <p>Click the 8-ball to get an answer!</p>
      <div
        style={{ backgroundColor: color }}
        className="circle"
        onClick={getAnswer}
      >
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default EightBall;
