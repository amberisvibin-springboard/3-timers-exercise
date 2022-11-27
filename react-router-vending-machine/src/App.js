import "./App.css";
import VendingMachine from "./VendingMachine";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/">
            <VendingMachine />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
