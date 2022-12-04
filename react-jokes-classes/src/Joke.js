import React from "react";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

function Joke(props) {
  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={(evt) => props.vote(props.id, +1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={(evt) => props.vote(props.id, -1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {props.votes}
      </div>

      <div className="Joke-text">{props.text}</div>
    </div>
  );
}

export default Joke;
