import React from "react";
import { NavLink } from "react-router-dom";
// import "./NavBar.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <NavLink exact to="/dogs">
        Home
      </NavLink>
      <NavLink exact to="/eat">
        Eat
      </NavLink>
      <NavLink exact to="/drink">
        Drink
      </NavLink>
    </nav>
  );
}

export default NavBar;
