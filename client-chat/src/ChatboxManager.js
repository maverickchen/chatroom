import React, { Component } from 'react';
import Chatbox from './Chatbox'
import TextInput from './TextInput';
import idb from './idb'

class ChatboxManager extends Component {
  constructor(props) {
    super(props);
    this.state = { chatboxes: [] };
    this.socket = props.socket;
    this.socket.on('incoming-chat', async (event) => await this.newChatIfNotExists(event))
    this.socket.emit('join', props.username);
    this.username = props.username;
  }

  async newChatIfNotExists(event) {
    console.log('received message', event)
    const { message, sender, recipient } = event;
    const otherUser = (sender === this.username) ? recipient : sender
    const chatbox = this.state.chatboxes.filter((chat) => {
      return (chat.recipient === otherUser)
    })[0];
    if (!chatbox) {
      console.log(this.username, this.recipient)
      await new idb().saveMessage(this.username, otherUser, { message, sender });
      this.onChatAdd(otherUser);
    }
  }

  onChatAdd(recipient) {
    if (recipient) {
      new idb().loadHistoryToChatbox(this.username, recipient).then((newChat) => {
        this.setState((prevState) => ({
          chatboxes: [...prevState.chatboxes.filter((chat) => { return chat.recipient !== recipient }), newChat]
        }))
      })
    }
  }

  handleSubmit(event, recipient) {
    if (event.key === 'Enter') {
      this.onChatAdd(recipient);
      return true;
    }
    return false;
  }

  onChatClose(recipient) {
    this.setState((prevState) => ({
      chatboxes: prevState.chatboxes.filter((chat) => {
          return (chat.recipient !== recipient)
        })
      })
    );
  }

  render() {
    const chatboxes = this.state.chatboxes.map((chat) => {
      return <Chatbox recipient={chat.recipient}
                      username={this.username}
                      messages={chat.messages}
                      socket={this.socket}
                      onClose={()=>this.onChatClose(chat.recipient)}
                      key={chat.recipient} />
    });

    return (
      <div>
        <div>
          <h4>
            New Chat with 
            <TextInput
              className='Text-input' 
              onSubmit={(event, recipient) => {
                  return this.handleSubmit(event,recipient);
                }
              }
            />
          </h4>
        </div>
        <div className='Chatboxes'>
          {chatboxes}
        </div>
      </div>
    );
  }
}

export default ChatboxManager;