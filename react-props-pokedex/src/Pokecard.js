function Pokecard(props) {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  return (
    <div className="pokecard">
      <h3>{props.name}</h3>
      <img src={imgSrc}></img>
      <p>Type: {props.type}</p>
      <p>Base EXP: {props.base_experience}</p>
    </div>
  );
}

export default Pokecard;
