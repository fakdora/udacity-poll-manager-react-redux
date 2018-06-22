import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

    handleLoginNameSelect = (e) => {
      e.preventDefault()
      const { dispatch } = this.props
      const uid = e.target.value
      dispatch(setAuthedUser(uid))
    }

    render() {
        
        const { users } = this.props
        
        return (
            <div className="book-shelf-changer">
            
              <select
                onChange={this.handleLoginNameSelect}
              >
              <option value="login" selected disabled>Please choose a name to login:</option>
              {
              Object.keys(users).map(((uid) => (
                  <option value={uid}>{users[uid].name}</option>
                )))
              }
              
                </select>
            
                <select 
                    onChange = {this.handleLoginNameSelect}
                >

                    <option value="moveto" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>

        )
    }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login)


