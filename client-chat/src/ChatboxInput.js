import React, { Component } from 'react';
import './Chatbox.css';
import TextInput from './TextInput';

class ChatboxInput extends Component {
  constructor(props) {
    super(props);
    this.submitMessage = props.submit;
  }

  handleSubmit(event, message) {
    if (event.key === 'Enter') {
      this.submitMessage(message, 'sent');
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className='Chatbox-input'>
        <TextInput 
          className='Text-input'
          onSubmit={(event, message) => {
              return this.handleSubmit(event, message)
            }
          } 
        />
      </div>
    );
  }
}

export default ChatboxInput;