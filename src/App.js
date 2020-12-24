import React, { Fragment } from "react";
import { HashRouter, BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import Dashboard from "./Components/Pages/Dashboard";
import Cruz from "./Components/Pages/Cruz";
import Monday from "./Components/Pages/Monday";
import Bnb from "./Components/Pages/Bnb";
import Home from "./Components/Pages/Home";
import Tableau from "./Components/Pages/Tableau";

import { MondayClient } from "./Hooks/useMonday";
import { ApolloProvider } from "@apollo/react-hooks";
const AppRouter = () => {
  return (
    <HashRouter>
      <Fragment>
        <Switch>
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Bnb" component={Bnb} />
          <Route exact path="/" component={Home} />
          <Route exact path="/Cruz" component={Cruz} />
          <Route exact path="/Tableau" component={Tableau} />
        </Switch>
      </Fragment>
    </HashRouter>
  );
};

const App = () => {
  const client = MondayClient();
  return (
    <div>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </div>
  );
};

export default App;
