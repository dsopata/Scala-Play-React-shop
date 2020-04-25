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
          <Button variant="contained" color="primary" href="/products">
                Primary
          </Button>
        </li>
      </ul>
    </div>
  </Router>
}

export default App;