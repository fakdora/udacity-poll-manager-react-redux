import React, { Component } from 'react'
import { connect } from 'react-redux'

import Poll from './Poll'


class HomePage extends Component {
  state = {
    showUnanswered: true
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ 
      [name]: value
    })
  }

  handleBtnClick = (e) => {
    e.preventDefault()
    
    const btnName = e.target.name
    
    this.setState(() => {
      if (btnName === "unanswered-btn") {
        return { showUnanswered:true }
      } else {
        return { showUnanswered: false }
      }
    })
  }

  render() {
    const { showUnanswered } = this.state

    return (
      <div>
      <button type="button home-button" 
        name="unanswered-btn"
        id="unanswered-btn" 
        className={showUnanswered ? "highlight-btn" : "unhighlight-btn"}
        onClick={this.handleBtnClick}
        >
        Unanswered
      </button>
      <button type="button contact-button" 
        id="answered-btn"
        name="answered-btn"
        className={showUnanswered ? "unhighlight-btn" : "highlight-btn"}
        onClick={this.handleBtnClick}
      >
        Answered
      </button>

      <h3 className='center'>
        {
          showUnanswered
            ? "Unasnwered Polls"
            : "Answered Polls"
        }
          </h3>
  
        <ul className='dashboard-list'>
        {
          showUnanswered
            ?
              this.props.pollsUnansweredIds.map((id) => (
                <li key={id}>
                  <Poll id={id} />
                </li>
              ))
            :
              this.props.pollsAnsweredIds.map((id) => (
                <li key={id}>
                  <Poll id={id} />
                </li>
              ))
        }
        </ul>
      </div>
    )
  }
}

function filterAnswers(polls, userAnswers, filterCB) {
  const filteredPolls = Object.keys(polls).filter((pollId) =>
    filterCB(pollId)
  ).reduce((obj, key) => {
    return {
      ...obj,
      [key]: polls[key]
    };
  }, {});
  return filteredPolls
}

function mapStateToProps({ polls, authedUser, users }) {
  const authedUserInfo = users[authedUser]
  const userAnswers = Object.keys(authedUserInfo.answers)

  const answeredFilterCB = (pollId) => userAnswers.includes(pollId) 
  const pollsAnswered = filterAnswers(polls, userAnswers, answeredFilterCB)
  const unansweredFilterCB = (pollId) => !userAnswers.includes(pollId) 
  const pollsUnanswered = filterAnswers(polls, userAnswers, unansweredFilterCB)

  return {
    pollsUnansweredIds: Object.keys(pollsUnanswered)
      .sort((a, b) => polls[b].timestamp - polls[a].timestamp),
    pollsAnsweredIds: Object.keys(pollsAnswered)
      .sort((a, b) => polls[b].timestamp - polls[a].timestamp),
  }
}

export default connect(mapStateToProps)(HomePage)