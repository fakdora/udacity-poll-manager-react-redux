import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { formatPoll, formatDate } from '../utils/helpers'
import { handleAnswerPoll } from '../actions/polls'

class PollDetailPage extends Component {
  state = {
    vote: "optionOne"
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, author } = this.props
    
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
    const { poll, answered, author } = this.props

    const {
      name, id, timestamp, optionOne, optionTwo, avatar
    } = poll

    if (poll == null) {
      return <Redirect to="/404" />
    }
    const unansweredForm = (
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
        <input type="submit" value="Submit" />
      </form>
    )

    const chosenAnswer = author['answers'][id]
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const totalNumVotes = optionOneVotes + optionTwoVotes

    const result = (
      <div>
        <div className=
        {(chosenAnswer === "optionOne") 
          ? "chosen-ans btn"
          : "btn"
        }
        >
        {optionOne.text}: 
          {optionOneVotes} votes 
          { ((optionOneVotes/totalNumVotes) * 100).toFixed(1) }%
        </div>
        <div className=
      {(chosenAnswer === "optionTwo") 
          ? "chosen-ans btn"
          : "btn"
        }
        >
          {optionTwo.text}: 
          {optionTwoVotes} votes 
          { ((optionTwoVotes / totalNumVotes) * 100).toFixed(1) }%
        </div >
      </div>
    )
    // const { id, avatar }

    return (
      <div>
      <h2>Would you rather? </h2>
      <div>asked by: 
      <img src={avatar} alt={`Avatar of ${name}`}
            className='avatar' />
      {name}
      </div>
        {(answered)
          ? 
          result
          : unansweredForm}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, polls }, props) {
  const pollId = props.match.params.id
  const poll = polls[pollId]
  
  let author = null 
  if (poll) {
    author = users[poll['author']]
  }

  const answered = Object.keys(users[authedUser].answers)
                    .includes(pollId)


  return {
    authedUser,
    // authedUserDetail: users[authedUser],
    poll: formatPoll(poll, author, authedUser),
    author,
    answered,
  }
}

export default connect(mapStateToProps)(PollDetailPage)