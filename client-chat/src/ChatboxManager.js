import React, { Component } from 'react';
import Select from 'react-select';
import Chatbox from './Chatbox';
import idb from './idb'

class ChatboxManager extends Component {
  constructor(props) {
    super(props);
    this.state = { chatboxes: [], activeUsers: ['mav', 'minsun', 'bobert'] };
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

  onChatClose(recipient) {
    this.setState((prevState) => ({
      chatboxes: prevState.chatboxes.filter((chat) => {
          return (chat.recipient !== recipient)
        })
      })
    );
  }

  render() {
    const selectOptions = this.state.activeUsers.map((user) => {
      return {value:user, label:user}});

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
            New Chat with: 
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              name="username"
              onChange={(username)=>this.onChatAdd(username.value)}
              options={selectOptions}
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