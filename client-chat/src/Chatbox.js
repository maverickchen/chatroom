import React, { Component } from 'react';
import { animateScroll } from 'react-scroll';
import ChatBoxHeader from './ChatboxHeader';
import './Chatbox.css'
import ChatBoxInput from './ChatboxInput';
import ChatBubbleArea from './ChatBubbleArea';
import idb from './idb';


class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages ? props.messages : []
    };
    this.scrollId = props.recipient;
    this.props.socket.on('incoming-chat', async (event) => await this.onMessageReceived(event))
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentWillUnmount() {
    // this.socket.close();
  }

  async onMessageReceived(event) {
    console.log('received message', event)
    const { message, sender, recipient } = event;
    if (this.props.recipient === recipient || this.props.recipient === sender) {
      this.addNewMessage(message, sender);
      await new idb().saveMessage(this.props.username, this.props.recipient, { message, sender })
    }
  }

  addNewMessage(message, sender) {
    const messageObj = { message, sender }
    this.setState((prevState) => ({
      messages: [ ...prevState.messages, messageObj ]
    }), this.scrollToBottom);
  }

  scrollToBottom() {
    console.log('scrolling!')
    animateScroll.scrollToBottom({
      containerId: this.scrollId
    });
  }

  postMessage(message) {
    console.log('posting message', message, 'from', this.props.username, 'to', this.props.recipient);
    const chatObj = {
      message,
      sender: this.props.username,
      recipient: this.props.recipient
    }
    this.props.socket.emit('send-chat', chatObj);
  }

  render() {
    return (
      <div className='Chatbox-main'>
        <ChatBoxHeader 
          recipient={this.props.recipient}
          onClose={this.props.onClose} />
        <ChatBubbleArea
          recipient={this.props.recipient}
          username={this.props.username}
          messages={this.state.messages}
          scrollId={this.scrollId} />
        <ChatBoxInput
          submit={(message)=>this.postMessage(message)} />
      </div>
    );
  }
}

export default Chatbox;