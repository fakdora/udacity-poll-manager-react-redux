import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logoutUser } from '../actions/authedUser'


class UserInfo extends Component {

  handleLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  render() {

    const { users, authedUser } = this.props
    const userDetail = users[authedUser]
    return (
      <ul className='user-info'>
        <li>
          Welcome {userDetail.name}
          <button
            className="logout-btn"
            onClick={this.handleLogout}
          > Logout</button>
        </li>
      </ul>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(UserInfo)