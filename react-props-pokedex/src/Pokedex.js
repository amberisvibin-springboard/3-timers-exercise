import Pokecard from "./Pokecard";

function Pokedex(props) {
  const pokelist = [];
  for (let p of props.pokemon) {
    pokelist.push(
      <Pokecard
        id={p.id}
        name={p.name}
        type={p.type}
        base_experience={p.base_experience}
      ></Pokecard>
    );
    // console.log(pokelist);
  }
  // console.log(pokelist);
  // console.log(props.pokemon);
  return (
    <div>
      <h1>Pokedex</h1>
      {pokelist}
    </div>
  );
}

export default Pokedex;
