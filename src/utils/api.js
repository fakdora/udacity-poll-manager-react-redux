import { _getUsers, _getQuestions } from './_DATA'

export function getUsersData() {
    // return Promise.all(_getUsers)
    // return _getUsers().then(([users]) => ({
    //     users
    // }))
    return Promise.all([_getUsers()]).then((users) => {
        console.log(users[0])
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