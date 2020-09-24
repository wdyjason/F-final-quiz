import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from "react-router";
import Home from './views/Home';
import AddTrainee from './views/AddTrainee';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/trainees/add' component={AddTrainee} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
