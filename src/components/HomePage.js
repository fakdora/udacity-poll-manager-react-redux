import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'

class HomePage extends Component {

    render() {
        console.log('this.props: ', this.props)
        return (
            <div>
            <header className="container-header">
                <h1 className="container-title">Would you rather?</h1>
            </header>
            <div>
                <h3 className='center'>Timeline</h3>
                <ul className='dashboard-list'>
                    {this.props.pollIds.map((id) => (
                        <li key={id}>
                        <div> Poll ID: {id}</div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        )
    }
}

function mapStateToProps({ polls }) {
    return {
        pollIds: Object.keys(polls)
            .sort((a, b) => polls[b].timestamp - polls[a].timestamp)
    }
}

export default connect(mapStateToProps)(HomePage)