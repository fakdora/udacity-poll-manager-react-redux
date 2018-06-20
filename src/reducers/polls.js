import { RECEIVE_POLLS, ANSWER_POLL, ADD_POLL } from '../actions/polls'

export default function polls(state={}, action) {
    switch (action.type) {

        case RECEIVE_POLLS:
            return {
                ...state,
                ...action.polls
            }
        case ANSWER_POLL:
          const otherOption = (action.answer === "optionTwo") 
            ? "optionOne" 
            : "optionTwo"
          
          return {
            ...state,
            [action.id]: {
              ...state[action.id],
              [action.answer]: state[action.id].answer.votes.concat(action.authedUser),
              otherOption: state[action.id].otherOption.votes.filter((uid) => uid !== action.authedUser)
            }
          }
        case ADD_POLL:
          const { poll } = action
          return {
            ...state,
            [action.poll.id]: action.poll,
          }
          

        default:
            return state
    }
}


// "8xf0y6ziyjabvozdd253nd": {
//   id: '8xf0y6ziyjabvozdd253nd',
//     author: 'sarahedo',
//     timestamp: 1467166872634,
//     optionOne: {
//       votes: ['sarahedo'],
//       text: 'have horrible short term memory',
//     },
//     optionTwo: {
//       votes: [],
//       text: 'have horrible long term memory'
//   }
// },