import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { CreateForm } from "./Screens/create"
import React from 'react';
import { SimpleTable } from "./Screens/list"
import { UpdateForm } from "./Screens/update"
import {
  withRouter
} from 'react-router-dom'

function App(props) {
  return (
    <>
      <Switch>
        <Route exact path="/create">
          <CreateForm {...props} />
        </Route>

        <Route path="/edit">
          <UpdateForm {...props} />
        </Route>
        <Route path="/">
          <SimpleTable {...props} />
        </Route>
      </Switch>
    </>

  );
}

export default withRouter(App);
