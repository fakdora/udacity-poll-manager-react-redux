import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll, formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'

class Poll extends Component {
  render () {
    const { poll } = this.props

    const { 
      name, id, timestamp, optionOne, optionTwo, avatar
    } = poll

    return (
      <Link to={`/questions/${id}`}className='poll'>
          <div className='poll-info'>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            <div>{optionOne.text}</div>
            <div>{optionTwo.text}</div>
          </div>
          
          <img 
              src={avatar}
              alt={`Avatar of ${name}`}
              className='avatar'
          />
      </Link>  
    )
  }
}

function mapStateToProps ({authedUser, users, polls}, {id}) {
  const poll = polls[id]
  
  return {
    authedUser,
    poll: formatPoll(poll, users[poll.author], authedUser)
  }
}

export default connect(mapStateToProps)(Poll)