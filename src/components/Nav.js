import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../actions/authedUser'

class Nav extends Component {

  handleLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  render() {

    const { users, authedUser } = this.props
    const userDetail = users[authedUser]
    return (
      <nav className='nav'>
        <ul>
          <li>
              <NavLink to="/">
                  Home
              </NavLink>
          </li>
          <li>
              <NavLink to="/add">
                  Create New Poll
              </NavLink>
          </li>
          <li>
              <NavLink to="/leaderboard">
                  Leaderboard
              </NavLink>
          </li>
        </ul>

        <ul className='user-info'>
          <li>
            Welcome {userDetail.name}
          <button 
              className="logout-btn"
            onClick={this.handleLogout}
            > Logout</button>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Nav)