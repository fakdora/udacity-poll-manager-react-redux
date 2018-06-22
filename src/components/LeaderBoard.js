import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    render() {
      const { users, sortedUserIDs } = this.props
      console.log('this.props: ', this.props)
      console.log('users: ', users)


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
                <span>{users[id].name} </span>
                Questiosn Asked
                {users[id].questions.length}
                
                <span>Questions Answered</span>
                {Object.keys(users[id].answers).length}

                Total: 
                {Object.keys(users[id].answers).length + 
                users[id].questions.length}
            </div>
            </li>
          ))}
        </ul>

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

function mapStateToProps({ users }) {
  console.log('here you go')
  console.log(users['sarahedo'].answers)
  console.log(Object.keys(users['sarahedo'].answers).length)
  console.log(users['sarahedo'].questions.length)

  return {
    
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