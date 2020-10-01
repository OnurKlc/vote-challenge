import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
