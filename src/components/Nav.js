import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutUser } from '../actions/authedUser'

class Nav extends Component {

  handleLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    console.log('logout user ')
    dispatch(logoutUser())
  }

  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
              <NavLink to='/' exact activeClassName='active'>
                  Home
              </NavLink>
          </li>
          <li>
              <NavLink to='/add' activeClassName='active'>
                  Create New Poll
              </NavLink>
          </li>
          <li>
              <NavLink to='/leaderboard' activeClassName='active'>
                  Leaderboard
              </NavLink>
          </li>
        </ul>

        <ul className='user-info'>
          <li>
          Welcome {this.props.authedUser}
          <button 
            className=""
            onClick={this.handleLogout}
            > (Logout)</button>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(Nav)