import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Dbscan from "./components/Dbscan";

import "./App.css";

const App = () => 
{
  return (
    <>
      <Header />
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/dbscan">
          <Dbscan />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;