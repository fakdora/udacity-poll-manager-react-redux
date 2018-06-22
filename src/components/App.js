import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'

import HomePage from './HomePage'
import Login from './Login'
import Nav from './Nav'
import NewPoll from './NewPoll'
import PollDetailPage from './PollDetailPage'
import Leaderboard from './LeaderBoard'
import PageNotFound from './Page404'
import { handleInitialData } from '../actions/shared'
// import { getInitialData } from '../utils/api'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
          {
            this.props.authedUser === null
              ? <Login />
              :
              <div>
                <Nav />
                <Switch>
                  <Route path='/add' exact component={NewPoll} />
                  <Route path='/questions/:id' component={PollDetailPage} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
                  <Route path='/404' component={PageNotFound} />
                  <Route path='/' exact component={HomePage} />
                </Switch>
              </div>
          }
        </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
