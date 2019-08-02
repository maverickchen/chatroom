import React, { Component } from 'react';
import './SignIn.css'

const io = require('socket.io-client');

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
    // this.login = props.login;
  }

  updateInputValue(event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  clearInput() {
    this.setState({
      inputValue: ''
    })
  }
  
  login(username) {
    var socket = io('localhost:5000');
    socket.on('connect', () => {
      console.log('wow, connected!')
      socket.emit('message', `hello it's me, ${username}`)
    })
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      this.login(this.state.inputValue);
      this.clearInput()
    }
  }

  render() {
    return (
      <div className='Signin-Input'>
        Welcome. Please sign in. 
        <input className='Text-input' value={this.state.inputValue}
              onChange={event => this.updateInputValue(event)}
              onKeyPress={event => this.handleSubmit(event)}
        />
      </div>
    );
  }
}

export default SignIn;