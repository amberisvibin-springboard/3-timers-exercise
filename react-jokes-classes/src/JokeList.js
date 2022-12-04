import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

function JokeList(props) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* retrieve jokes from API */

  async function getJokes() {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      //let jokes = [];
      let seenJokes = new Set();
      let jokeCount = 0;

      while (jokeCount < props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { ...joke } = res.data;

        console.log(joke);

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          //jokes.push({ ...joke, votes: 0 });
          jokeCount++;
          setJokes((current) => [...current, { ...joke, votes: 0 }]);
        } else {
          console.log("duplicate found!");
        }
      }

      setIsLoading(false);
      //console.log(jokes);
    } catch (err) {
      console.error(err);
    }
  }

  /* empty joke list, set to loading state, and then call getJokes */

  function generateNewJokes() {
    setIsLoading(true);
    getJokes();
  }

  /* change vote for this id by delta (+1 or -1) */

  function vote(id, delta) {
    setJokes(
      jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  }

  useEffect(() => {
    console.log("run");
    getJokes();
  }, []);

  /* render: either loading spinner or list of sorted jokes. */

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  } else {
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={generateNewJokes}>
          Get New Jokes
        </button>

        {sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))}
      </div>
    );
  }
}

export default JokeList;

JokeList.defaultProps = {
  numJokesToGet: 5,
};
