import React, { Component } from 'react';
import Chatbox from './Chatbox'
import TextInput from './TextInput';

class ChatboxManager extends Component {
  constructor(props) {
    super(props);
    this.state = { chatboxes: props.chatboxes };
  }


  // load messages from localStorage if they exist
  // ensure only one copy of each chatbox exists at any time
  onChatAdd(recipient) {
    if (recipient) {
      console.log(recipient, this.state.chatboxes)
      const messages = localStorage.getItem(recipient) || []
      const newChat = { recipient, messages }
      this.setState((prevState) => ({
          chatboxes: [...prevState.chatboxes.filter((chat) => { return chat.recipient !== recipient }), newChat]
      }))
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
                      messages={chat.messages}
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