import { useParams } from "react-router-dom";

function DogDetails(props) {
  const { name } = useParams();
  let dog = props.dogs.find((x) => x.name === name);
  let facts = [];
  for (let fact in dog.facts) {
    facts.push(<li>{dog.facts[fact]}</li>);
  }
  console.log(facts);
  return (
    <div id="DogDetails">
      <h1>Dog details:</h1>
      <p className="capitalize">{dog.name}</p>
      <p>Age: {dog.age}</p>
      <img alt="dog" src={dog.src}></img>
      <ul>{facts}</ul>
    </div>
  );
}

export default DogDetails;
