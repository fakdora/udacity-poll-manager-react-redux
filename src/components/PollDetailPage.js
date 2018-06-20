import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class PollDetailPage extends Component {

    render() {
      const { poll } = this.props
      console.log('this.props: ', this.props)
      console.log('poll ', poll)
      if (poll == null) {
        return <Redirect to="/404" />
      }
      // const { id, avatar }

      return <h3>PollDetailPage</h3>
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
  const id = props.match.params.id
  const poll = polls[id]
  const authedUserDetail = users[authedUser]
  console.log('users: ', users)
  let author = null 
  
  if (poll) {
    author = users[poll['author']]
  }
  console.log('authedUserDetail: ', authedUserDetail)
  console.log('author:, ', author)
  return {
    authedUser,
    poll,
    author,
    authedUserDetail,
  }
}


export default connect(mapStateToProps)(PollDetailPage)