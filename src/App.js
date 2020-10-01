import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import { AddLink, List } from "./pages/index"

import Header from "./components/Header/Header"
import "./style/App.scss"

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <div className="main-wrapper">
          <Switch>
            <Route path="/" exact>
              <Redirect exact from="/" to="/list" />
            </Route>
            <Route path="/list" exact>
              <List />
            </Route>
            <Route path="/addLink" exact>
              <AddLink />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
