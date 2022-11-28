import { Link } from "react-router-dom";

function Soda(props) {
  return (
    <div className="Soda">
      <h1>Soda</h1>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}

export default Soda;
