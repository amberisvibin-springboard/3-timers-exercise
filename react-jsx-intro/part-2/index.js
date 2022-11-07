function Tweet(props) {
  return (
    <div className="tweet">
      <h3>{props.name}</h3>
      <h5>
        by @{props.username} on {props.date}
      </h5>
      <p>{props.message}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Tweet
        name="timmy"
        username="timmy1923"
        date="Oct. 2, 2003"
        message="woag, message"
      />
      <Tweet
        name="tommy"
        username="tommyboy"
        date="Oct. 3, 2003"
        message="the mask is a good movie"
      />
      <Tweet
        name="alfred"
        username="alfredclownhouse"
        date="Oct. 6, 2003"
        message="watch penny parkeer"
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
