import { Link } from "react-router-dom";

function VendingMachine(props) {
  return (
    <div className="VendingMachine">
      <h1>Vending Machine</h1>
      <p>Select one:</p>
      <p>
        <Link to="/candy">Candy</Link>
      </p>
      <p>
        <Link to="/chips">Chips</Link>
      </p>
      <p>
        <Link to="/soda">Soda</Link>
      </p>
    </div>
  );
}

export default VendingMachine;
