import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './HomePage'
import Nav from './Nav'
import PollDetail from './PollDetail'
import NewPoll from './NewPoll'
import Leaderboard from './LeaderBoard'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          
            <Route path='/' exact component={HomePage} />
            <Route path='/questions/:id' component={PollDetail} />
            <Route path='/new' component={NewPoll} />
            <Route path='/leaderboard' component={Leaderboard} />
          
        </div>
      </Router>
    );
  }
}

export default App;
