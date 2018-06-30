import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import UserInfo from './UserInfo'
import { logoutUser } from '../actions/authedUser'


class Nav extends Component {

  handleLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  render() {

    return (
      <nav className='nav'>
        <ul>
          <li>
              <NavLink exact to="/">
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

        <UserInfo />
      </nav>
    )
  }
}

export default Nav
