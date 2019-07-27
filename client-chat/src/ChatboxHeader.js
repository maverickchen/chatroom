import React from 'react';
import './Chatbox.css';

function ChatBoxHeader(props) {
  return (
    <div>
      <h4 className='Chatbox-header'>
        {props.header}
      </h4>
    </div>
  )
}

export default ChatBoxHeader;