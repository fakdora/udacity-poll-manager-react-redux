import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll, formatDate } from '../utils/helpers'

class Poll extends Component {
    render () {
        console.log('poll.js this.props ', this.props)
        const { poll } = this.props
        if (poll == null) {
            return <p>This poll does not exist</p>
        }

        const { 
            name, id, timestamp, optionOne, optionTwo, avatar
        } = poll

        return (
            <div className='poll'>
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
            </div>
            
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