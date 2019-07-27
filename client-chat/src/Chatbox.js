import React, { Component } from 'react';
import ChatBoxHeader from './ChatboxHeader';
import './Chatbox.css'
import ChatBoxInput from './ChatboxInput';
import ChatBubbleArea from './ChatBubbleArea';

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: props['recipient'],
      messages: []
    };
  }

  onSubmitNewMessage = (message) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, message]
    }));
  }

  render() {
    return (
      <div className='Chatbox-main'>
        <ChatBoxHeader header={this.state.recipient} />
        <ChatBubbleArea messages={this.state.messages} />
        <ChatBoxInput onClick={this.onSubmitNewMessage}/>
      </div>
    );
  }
}

export default Chatbox;