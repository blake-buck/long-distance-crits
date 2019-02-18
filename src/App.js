import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './ducks/store';

import logo from './logo.svg';
import routes from './routes.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            {routes}
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
