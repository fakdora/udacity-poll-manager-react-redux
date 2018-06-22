import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { formatPoll, formatDate } from '../utils/helpers'

class PollDetailPage extends Component {
  state = {
    vote: "optionOne"
  }

  handleSubmit = (e) => {
    e.preventDefault()

    alert(this.state.vote)
  }

  handleChange = (e) => {
    
    console.log('e', e)
    const currentVote = e.target.value
    console.log('currentVote: ', currentVote)
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

// "8xf0y6ziyjabvozdd253nd": {
//   id: '8xf0y6ziyjabvozdd253nd',
//   author: 'sarahedo',
//   timestamp: 1467166872634,
//   optionOne: {
//     votes: ['sarahedo'],
//       text: 'have horrible short term memory',
//     },
//   optionTwo: {
//     votes: [],
//       text: 'have horrible long term memory'
//   }
// },

// sarahedo: {
//   id: 'sarahedo',
//   name: 'Sarah Edo',
//   avatarURL: "https://pbs.twimg.com/profile_images/675531002043699200/x7kAHIgw_400x400.jpg",
//   answers: {
//     "8xf0y6ziyjabvozdd253nd": 'optionOne',
//     "6ni6ok3ym7mf1p33lnez": 'optionOne',
//     "am8ehyc8byjqgar0jgpub9": 'optionTwo',
//     "loxhs1bqm25b708cmbf3g": 'optionTwo'
//   },
//   questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
// },

function mapStateToProps({ authedUser, users, polls }, props) {
  const pollId = props.match.params.id
  const poll = polls[pollId]
  console.log('users: ', users)

  let author = null 
  if (poll) {
    author = users[poll['author']]
  }
  console.log('author:, ', author)

  const answered = Object.keys(users[authedUser].answers)
                    .includes(pollId)


  return {
    authedUser,
    authedUserDetail: users[authedUser],
    poll: formatPoll(poll, users[poll.author], authedUser),
    author,
    answered,
    
  }
}

export default connect(mapStateToProps)(PollDetailPage)