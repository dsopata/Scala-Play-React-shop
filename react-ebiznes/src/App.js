import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';

import Button from '@material-ui/core/Button';

import './App.css';

function App() {
  return <Router>
    <div id="menu">
      <ul>
        <li>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="http://localhost:3000">Ebiznes sklep</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href="http://localhost:3000">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/products">Products</a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="#">Pricing</a>
                </li>
              </ul>

              {/*<form className="form-inline my-2 ">*/}
              {/*  <input className="form-control mr-sm-2" type="search" placeholder="Search"></input>*/}
              {/*  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
              {/*</form>*/}
              <ul className="navbar-nav  my-2 ">
                <li>
                  <a className="nav-link" href="http://localhost:3000/Login">Login/ Register <span className="sr-only">(current)</span></a>

                </li>
              </ul>
            </div>
          </nav>
        </li>
      </ul>
    </div>
  </Router>
}

export default App;