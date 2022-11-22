function ShuffleDeck(props) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    //console.log("okay");
    props.doShuffleDeck();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Shuffle Deck</button>
    </form>
  );
}

export default ShuffleDeck;
