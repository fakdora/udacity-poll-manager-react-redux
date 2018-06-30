import React, { Component } from 'react'
import { connect } from 'react-redux'


const Leaderboard = ({ users, sortedUserIDs }) => {

    return (
      <ul className='dashboard-list'>
        {sortedUserIDs.map((id) => (
          <li key={id}>
          <div>
            <img 
              src={users[id].avatarURL} 
              alt={users[id].name} 
              className="avatar"
            />
            <div>
              <div>{users[id].name}</div>

              Questiosn Asked:   
              {users[id].questions.length}
              <br />
              <span>Questions Answered: </span>
              {Object.keys(users[id].answers).length}
              <br />
              <label>Total:   </label>
              {Object.keys(users[id].answers).length + 
              users[id].questions.length}
            </div>
          </div>
          </li>
        ))}
      </ul>
    )
}

function mapStateToProps({ users }) {

  return {
    // TODO change  make users to return sorted version, not here
    sortedUserIDs: Object.keys(users)
      .sort((a, b) => {
        const userACount = Object.keys(users[a].answers).length + users[a].questions.length
        const userBCount = Object.keys(users[b].answers).length + users[b].questions.length
        return userBCount - userACount
      }),
    users,

  }
}

export default connect(mapStateToProps)(Leaderboard)
