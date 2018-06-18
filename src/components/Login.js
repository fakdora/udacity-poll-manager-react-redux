import React, { Component } from 'react'
import {
    getUsersData,
    getInitialData
} from '../utils/api'

class Login extends Component {
    state = {
        users: []
    }

    handleLoginNameSelect = (e) => {

    }
    // export function _getUsers() {
    //     return new Promise((res, rej) => {
    //         setTimeout(() => res({ ...users
    //         }), 1000)
    //     })
    // }
    fetchAllUserNames = () => {
   
    }

    render() {
        let currentLogin = ""
        let users = getUsersData().then((users) => {
            return users
        })
        console.log('user1: ', users)
        let init = getInitialData()
        console.log('init: ', getInitialData())
        return (
            <div className="book-shelf-changer">
            
                        <select 
                            value={currentLogin} 
                            onChange = {currentLogin =
                                (e) => this.props.handleLoginNameSelect(e)
                            }
                        >
                            <option value="moveto" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
            </div>

        )
    }
}

export default Login


