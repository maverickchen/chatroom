import React, { Component } from 'react';
import ChatBoxHeader from './ChatboxHeader';
import './Chatbox.css'
import ChatBoxInput from './ChatboxInput';
import ChatBubbleArea from './ChatBubbleArea';
import io from 'socket.io-client';
import idb from './idb';

class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages ? props.messages : []
    };
    this.recipient = props.recipient;
    this.username = props.username;
    this.onClose = props.onClose;
    this.socket = io('localhost:5000');
    
    this.socket.emit('join', this.recipient);
    this.socket.on('incoming-chat', async (event) => this.onMessageReceived(event))
  }

  componentWillUnmount() {
    this.socket.close();
  }

  async onMessageReceived(event) {
    console.log('received message', event)
    const { message, sender } = event;
    this.addNewMessage(message, sender);
    await new idb().saveMessage(this.username, this.recipient, { message, sender })
  }

  addNewMessage(message, sender) {
    const messageObj = { message, sender }
    this.setState((prevState) => ({
      messages: [ ...prevState.messages, messageObj ]
    }));
  }

  postMessage(message) {
    console.log('posting message', message, 'from', this.username, 'to', this.recipient);
    const chatObj = {
      message,
      sender: this.username,
      recipient: this.recipient
    }
    this.socket.emit('send-chat', chatObj);
  }

  render() {
    return (
      <div className='Chatbox-main'>
        <ChatBoxHeader 
          recipient={this.recipient}
          onClose={this.onClose} />
        <ChatBubbleArea
          recipient={this.recipient}
          username={this.username}
          messages={this.state.messages} />
        <ChatBoxInput
          submit={(message)=>this.postMessage(message)} />
      </div>
    );
  }
}

export default Chatbox;