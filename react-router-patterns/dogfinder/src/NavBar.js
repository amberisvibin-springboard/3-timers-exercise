import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar(props) {
  let navLinks = [];
  let dogName = "";
  let dogUrl = "";
  for (let dog in props.dogs) {
    dogName = props.dogs[dog].name;
    dogUrl = `/dogs/${dogName}`;
    navLinks.push(
      <NavLink exact to={dogUrl} key={dogName}>
        <p className="capitalize">{dogName}</p>
      </NavLink>
    );
  }
  return <nav className="NavBar">{navLinks}</nav>;
}

export default NavBar;
