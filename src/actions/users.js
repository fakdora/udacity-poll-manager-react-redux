export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_POLL_FOR_USER = 'ANSWER_POLL_FOR_USER'
export const ADD_USER_NEW_POLL = 'ADD_USER_NEW_POLL'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function addUserNewPoll({ qid, authedUser }) {
  return {
    type: ADD_USER_NEW_POLL,
    qid,
    authedUser
  }
}

export function answerPollUser({qid, authedUser, answer}) {
  return {
    type: ANSWER_POLL_FOR_USER,
    qid,
    authedUser,
    answer
  }
}
