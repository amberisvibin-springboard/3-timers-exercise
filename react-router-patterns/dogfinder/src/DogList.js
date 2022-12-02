import NavBar from "./NavBar";

function DogList(props) {
  return (
    <div id="DogList">
      <h1>Dog list:</h1>
      <NavBar dogs={props.dogs} />
    </div>
  );
}

export default DogList;
