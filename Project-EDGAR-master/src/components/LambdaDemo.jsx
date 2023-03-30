import React, { Component } from 'react'

class LambdaDemo extends Component {
    constructor(props) {
      super(props)
      this.state = { loading: false, msg: null }
    }
 
    handleClick = api => e => {
      e.preventDefault()
 
      this.setState({ loading: true })
      fetch("/.netlify/functions/" + api)
        .then(response => response.json())
        .then(json => this.setState({ loading: false, msg: json.msg }))
    }
 
    render() {
      const { loading, msg } = this.state
 
      return (
        <p>
          <button onClick={this.handleClick("debris")}>{loading ? "Loading..." : "Call Debris Lambda"}</button>
          <button onClick={this.handleClick("fireballs")}>{loading ? "Loading..." : "Call Fireballs Lambda"}</button>
          <br />
          <span>{msg}</span>
        </p>
      )
    }
}

export default LambdaDemo;