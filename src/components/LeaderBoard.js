import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    render() {
      console.log('users: ', users)
      return <h3>Leaderboard</h3>
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

function mapStateToProps({ users }) {
  return {
    users
  }
}


export default connect(mapStateToProps)(Leaderboard)