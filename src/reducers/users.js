import { 
  RECEIVE_USERS, 
  ANSWER_POLL_FOR_USER, 
  ADD_USER_NEW_POLL 
} from '../actions/users'


export default function users (state = {}, action) {
    switch(action.type) {
      
      case RECEIVE_USERS:
        return {
            ...state,
            ...action.users
        }

      case ANSWER_POLL_FOR_USER:
        return {
            ...state,
            [action.authedUser]: {
              ...state[action.authedUser],
              answers: {
                ...state[action.authedUser].answers,
                [action.qid]: action.answer
              }
            }
          }

      case ADD_USER_NEW_POLL:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            questions: 
              state[action.authedUser].questions.concat(action.qid),
            
          }
        }
       
        default:
            return state
    }
}
