import { getUsersData, getInitialData } from '../utils/api'
import { receivePolls } from './polls'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = "sarahedo"

export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, polls }) => {
                dispatch(receiveUsers(users))
                dispatch(receivePolls(polls))
                dispatch(setAuthedUser(AUTHED_ID))
            })
    }
}