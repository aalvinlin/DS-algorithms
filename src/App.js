import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Dbscan from "./components/Dbscan";

const App = () => 
{
  return (
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
  );
}

export default App;