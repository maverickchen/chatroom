import React, { Component } from 'react';
import ChatBoxHeader from './ChatboxHeader';
import './Chatbox.css'
import ChatBoxInput from './ChatboxInput';
import ChatBubbleArea from './ChatBubbleArea';

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: props.recipient,
      messages: props.messages ? props.messages : []
    };
    this.onClose = props.onClose;
  }

  submitNewMessage = (message, source) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, {message, source}]
    }));
  }

  render() {
    return (
      <div className='Chatbox-main'>
        <ChatBoxHeader name={this.state.recipient} onClose={this.onClose} />
        <ChatBubbleArea messages={this.state.messages} />
        <ChatBoxInput submit={this.submitNewMessage}/>
      </div>
    );
  }
}

export default Chatbox;