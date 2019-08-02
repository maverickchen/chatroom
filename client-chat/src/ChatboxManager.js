import React, { Component } from 'react';
import Chatbox from './Chatbox'

class ChatboxManager extends Component {
  constructor(props) {
    super(props);
    this.state = { chatboxes: props.chatboxes };
  }

  onAddChatbox() {
    
  }

  onChatClose(recipient) {
    console.log(recipient, this);
    this.setState((prevState) => ({
      chatboxes: prevState.chatboxes.filter((chat) => {
          return (chat.recipient !== recipient)
        })
      })
    );
  }

  render() {
    const chatboxes = this.state.chatboxes.map((chat) => {
      console.log(chat.recipient)
      return <Chatbox recipient={chat.recipient}
                      messages={chat.messages}
                      onClose={()=>this.onChatClose(chat.recipient)}
                      key={chat.recipient} />
    });
    console.log(chatboxes)
    return (
      <div className='Chatboxes'>
        {chatboxes}
      </div>
    );
  }
}

export default ChatboxManager;