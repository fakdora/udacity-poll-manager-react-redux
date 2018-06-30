import { 
  _getUsers, 
  _getQuestions, 
  _saveQuestionAnswer, 
  _saveQuestion 
} from './_DATA'


export function getUsersData() {
    return Promise.all([_getUsers()]).then((users) => {
        return users
    })
}

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, polls]) => ({
        users, 
        polls,
    }))
}

export function saveAnswer(info) {
  return _saveQuestionAnswer(info)
}

export function saveQuestion(info) {
  return _saveQuestion(info)
}
