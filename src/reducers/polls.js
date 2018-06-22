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
            [action.qid]: {
              ...state[action.qid],
              [action.answer]: {
                ...state[action.qid][action.answer],
                'votes': state[action.qid][action.answer].votes.concat(action.authedUser),
              },
              [otherOption]: {
                ...state[action.qid][otherOption],
                'votes': state[action.qid][otherOption].votes.filter((uid) => uid !== action.authedUser)
              }
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
