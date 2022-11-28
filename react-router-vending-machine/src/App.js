import "./App.css";
import VendingMachine from "./VendingMachine";
import Candy from "./Snacks/Candy";
import Chips from "./Snacks/Chips";
import Soda from "./Snacks/Soda";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/candy">
          <Candy />
        </Route>
        <Route exact path="/chips">
          <Chips />
        </Route>
        <Route exact path="/soda">
          <Soda />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
