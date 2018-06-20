import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'

class HomePage extends Component {

    render() {
        // console.log('this.props: ', this.props)
        return (
            <div>
                <h3 className='center'>Polls</h3>
                <ul className='dashboard-list'>
                    {this.props.pollIds.map((id) => (
                        <li key={id}>
                                <Poll id={id} />
                        </li>
                    ))}
                </ul>
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