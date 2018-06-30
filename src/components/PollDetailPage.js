import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { formatPoll } from '../utils/helpers'
import { handleAnswerPoll } from '../actions/polls'


class PollDetailPage extends Component {
  
  state = {
    vote: "optionOne"
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    
    const info = { 
      qid: this.props.poll.id, 
      answer: this.state.vote 
    }
    
    dispatch(handleAnswerPoll(info))
  }

  handleChange = (e) => {
    const currentVote = e.target.value
    
    this.setState(() => ({
      vote: currentVote
    }))
  }

  render() {
    const { poll } = this.props

    if (poll == null) {
      return <Redirect to="/404" />
    }
    const { answered, author } = this.props
    const {
      name, id, optionOne, optionTwo, avatar
    } = poll

    const unansweredForm = (
      <div className="poll-answer-form">
        <form onSubmit={this.handleSubmit}>
        <input type="radio"
          name="wouldyou"
          value="optionOne" 
          checked={this.state.vote === "optionOne"}
          onChange={this.handleChange}
           />
        {optionOne.text}
        <br />
        or
        <br />
        <input type="radio"
          name="wouldyou"
          value="optionTwo" 
          checked={this.state.vote === "optionTwo"}
          onChange={this.handleChange}
           />
        {optionTwo.text}
        <br />
        <input type="submit" value="Submit" className="btn" />
      </form>
      </div>
    )

    const chosenAnswer = author['answers'][id]
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const totalNumVotes = optionOneVotes + optionTwoVotes

    const result = (
      <div>
        <div className="goback-btn">
          <Link to="/">Return to Homepage</Link>
        </div>
        <div className=
        {(chosenAnswer === "optionOne") 
          ? "chosen-ans btn"
          : "btn"
        }
        >
          <div className="result-text">{optionOne.text}: </div>
          <div className="result-votes"> {optionOneVotes} votes </div>
          <div className="result-precent"> { ((optionOneVotes/totalNumVotes) * 100).toFixed(1) }%</div>
        </div>
        <div className=
      {(chosenAnswer === "optionTwo") 
          ? "chosen-ans btn"
          : "btn"
        }
        >
          <div className="result-text">{optionTwo.text}: </div>
          <div className="result-votes">{optionTwoVotes} votes </div>
          <div className="result-precent">{ ((optionTwoVotes / totalNumVotes) * 100).toFixed(1) }%</div>
        </div >
      </div>
    )
    // const { id, avatar }

    return (
      <div>
      <h2>Would you rather? </h2>
      <div>asked by:</div> 
      <div><img src={avatar} alt={`Avatar of ${name}`}
            className='avatar' /></div>
      <div>{name}</div>
        {(answered)
          ? 
          result
          : <div className="poll">{unansweredForm}</div>}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, polls }, props) {
  const pollId = props.match.params.id
  const poll = polls[pollId]
  
  let author = null 
  
  if (!poll) {
    return {
      poll: null
    }
  }

  author = users[poll['author']]

  const answered = Object.keys(users[authedUser].answers)
                    .includes(pollId)

  return {
    authedUser,
    poll: formatPoll(poll, author, authedUser),
    author,
    answered,
  }
}

export default connect(mapStateToProps)(PollDetailPage)
