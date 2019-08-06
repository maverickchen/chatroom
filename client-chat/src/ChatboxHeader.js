import React from 'react';
import './Chatbox.css';


function ChatBoxHeader(props) {
  return (
    <div>
      <h4 className='Chatbox-header'>
        <div style={{display:'inline-block', verticalAlign:'middle', overflowX:'hidden'}}>{props.name}</div>
        <div>
          <button className='Rounded'
                  onClick={() => props.onClose(props.name)}>
            <i className='material-icons' style={{color:'white'}}>close</i>
          </button>
        </div>
      </h4>
    </div>
  )
}

export default ChatBoxHeader;