function AddCard(props) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    //console.log("okay");
    props.GetCard();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Draw Card</button>
    </form>
  );
}

export default AddCard;
