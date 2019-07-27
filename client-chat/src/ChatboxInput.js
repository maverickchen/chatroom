import React, { Component } from 'react';
import './Chatbox.css';

class ChatboxInput extends Component {
  constructor(props) {
    super(props);
    this.submit = props.submit;
    this.state = {
      inputValue: ''
    };
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

  handleSubmit(event) {
    if (event.key === 'Enter') {
      this.submit(this.state.inputValue);
      this.clearInput()
    }
  }

  render() {
    return (
      <div className='Chatbox-input'>
        <input value={this.state.inputValue}
              onChange={event => this.updateInputValue(event)}
              onKeyPress={event => this.handleSubmit(event)}
        />
      </div>
    );
  }
}

export default ChatboxInput;