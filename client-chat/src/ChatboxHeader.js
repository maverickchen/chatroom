import React from 'react';
import './Chatbox.css';


function ChatBoxHeader(props) {
  return (
    <div>
      <h4 className='Chatbox-header'>
        <div style={{display:'inline-block', verticalAlign:'middle', overflowX:'hidden'}}>{props.recipient}</div>
        <div>
          <button className='Rounded Clickable'
                  onClick={() => props.onClose(props.recipient)}>
            <i className='material-icons' style={{color:'white'}}>close</i>
          </button>
        </div>
      </h4>
    </div>
  )
}

export default ChatBoxHeader;