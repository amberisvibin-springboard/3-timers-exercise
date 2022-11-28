import { Link } from "react-router-dom";

function Chips(props) {
  return (
    <div className="Chips">
      <h1>Chips</h1>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}

export default Chips;
