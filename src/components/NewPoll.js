import React, { Component } from 'react'
import { handleAddPoll } from '../actions/polls'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class NewPoll extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false
  }

  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState(() => {
      return {[name]: value}
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddPoll(optionOne, optionTwo))

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toHome: true
    }))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state
    const MAX_LENGTH = 80

    if (toHome === true) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h2 className="center">Would you rather</h2>
        <form className="new-poll" onSubmit={this.handleSubmit}>
          <input type="text"
            className="input"
            placeholder="First Option"
            value={optionOne}
            name="optionOne"
            onChange={this.handleChange}
            maxLength={MAX_LENGTH}
          /> 
          <input type="text"
            className="input"
            placeholder="Second Option"
            value={optionTwo}
            name="optionTwo"
            onChange={this.handleChange}
            maxLength={MAX_LENGTH}
          /> 

          <button
            className="btn"
            type="submit"
            disabled={optionOne === "" || optionTwo === ""}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewPoll)