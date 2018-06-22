import { saveAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { answerPollUser, addUserNewPoll } from './users'

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
      .then((poll) => {
        dispatch(addPoll(poll))
        dispatch(addUserNewPoll({ qid: poll.id, authedUser }))
      }) 
      .then(() => dispatch(hideLoading()))

  }
}

function answerPoll({ qid, authedUser, answer}) {
  return {
    type: ANSWER_POLL,
    qid,
    authedUser,
    answer
  }
}

export function handleAnswerPoll(info) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const { authedUser } = getState()
    
    info['authedUser'] = authedUser
    console.log('----- ', info)
    return (saveAnswer(info)
      .catch((e) => {
        console.warn('Error in handleAnswerPoll: ', e)
        alert('There was an error answering the poll. Try again.')
      }))
      .then(() => {
        dispatch(answerPoll(info))
        dispatch(answerPollUser(info))
      })
      .then(dispatch(hideLoading()))
  }
}