import React, { Component } from 'react';
import './Chatbox.css';

class ChatboxInput extends Component {
  constructor(props) {
    super(props);
    this.onClick = props.onClick;
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  clearInput() {
    this.setState({
      inputValue: ''
    })
  }

  render() {
    return (
      <div className='Chatbox-input'>
        <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
        <button onClick={() => {this.onClick(this.state.inputValue); this.clearInput()}}>
          Send
        </button>
      </div>
    );
  }
}

export default ChatboxInput;