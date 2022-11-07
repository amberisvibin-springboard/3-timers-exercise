function Person(props) {
  let name = props.name;
  if (name.length > 8) {
    name = name.substring(0, 5);
  }
  if (props.age >= 18) {
    return (
      <div className="person">
        <p>Learn some information about this person</p>
        <h2>{name}</h2>
        <h3>Please go vote!</h3>
        <p>Hobbies:</p>
        <ul>
          {props.hobbies.map((hobby) => (
            <li>{hobby}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="person">
        <p>Learn some information about this person</p>
        <h2>{name}</h2>
        <h3>You must be 18 to vote.</h3>
        <p>Hobbies:</p>
        <ul>
          {props.hobbies.map((hobby) => (
            <li>{hobby}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Person name="timmy" age="14" hobbies={["fairy"]} />
      <Person name="tommy" age="19" hobbies={["tommy gun", "the mask"]} />
      <Person
        name="alfred"
        age="28"
        hobbies={["penny parker", "chase", "gaming"]}
      />
      <Person name="geraldine" age="80" hobbies={["old"]} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
