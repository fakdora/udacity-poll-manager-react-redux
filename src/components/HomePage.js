import React, { Component } from 'react'
import Login from './Login'

class HomePage extends Component {

    render() {
        return (
            <div>
            <header className="container-header">
                <h1 className="container-title">Would you rather?</h1>
            </header>
            <div>
                Homepage
                <Login />
            </div>
            </div>
        )
    }
}

export default HomePage