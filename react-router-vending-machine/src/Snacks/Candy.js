import { Link } from "react-router-dom";

function Candy(props) {
  return (
    <div className="Candy">
      <h1>Candy</h1>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}

export default Candy;
