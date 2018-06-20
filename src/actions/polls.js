import { saveAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POLLS = "RECEIVE_POLLS"
export const ANSWER_POLL = "ANSWER_POLL"
export const ADD_POLL = "ADD_POLL"

export function receivePolls (polls) {
    return {
        type: RECEIVE_POLLS,
        polls,
    }
}

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll,
  }
}

export function handleAddPoll(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return saveQuestion({
      optionOneText: optionOne, 
      optionTwoText: optionTwo, 
      author: authedUser
    })
      .then((poll) => dispatch(addPoll(poll))) 
      .then(() => dispatch(hideLoading()))

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
// }


function answerPoll ({id, authedUser, answer}) {
  return {
    type: ANSWER_POLL,
    id,
    authedUser,
    answer
  }
}

export function handleAnswerPoll(info) {
  return (dispatch) => {
    dispatch(answerPoll(info))

    return saveAnswer(info)
      .catch((e) => {
        console.warn('Error in handleAnswerPoll: ', e)
        dispatch(answerPoll(info))
        alert('There was an error answering the poll. Try again.')
      })
  }
}