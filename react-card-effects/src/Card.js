import "./Card.css";

function Card(props) {
  return (
    <div className="Card">
      <img src={props.img} height="314px" width="226px"></img>
    </div>
  );
}
export default Card;
