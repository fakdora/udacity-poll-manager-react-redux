import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'

class HomePage extends Component {
  state = {
    showUnanswered: true
  }

  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState(() => {
      return { [name]: value }
    })
  }
  handleBtnClick = (e) => {
    e.preventDefault()
    const btnName = e.target.name
    console.log('btnName: ', btnName)
    this.setState(() => {
      if (btnName === "unanswered-btn") {
        return { showUnanswered:true }
      } else {
        return { showUnanswered: false }
      }
      
    })
  }
  render() {
    // console.log('this.props: ', this.props)
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
  console.log('userAnswers: ', userAnswers)

  const answeredFilterCB = (pollId) => userAnswers.includes(pollId) 
  const pollsAnswered = filterAnswers(polls, userAnswers, answeredFilterCB)
  // console.log('pollsAnswered: ', pollsAnswered)
  const unansweredFilterCB = (pollId) => !userAnswers.includes(pollId) 
  const pollsUnanswered = filterAnswers(polls, userAnswers, unansweredFilterCB)
  // console.log(' pollsUnanswered: ', pollsUnanswered)

  
    return {
      // pollIds: Object.keys(polls)
      //       .sort((a, b) => polls[b].timestamp - polls[a].timestamp),
      pollsUnansweredIds: Object.keys(pollsUnanswered)
        .sort((a, b) => polls[b].timestamp - polls[a].timestamp),
      pollsAnsweredIds: Object.keys(pollsAnswered)
        .sort((a, b) => polls[b].timestamp - polls[a].timestamp),
    }
}

export default connect(mapStateToProps)(HomePage)