import React from 'react';
import './Chatbox.css';

export default function ChatBubble(props) {
  return (
    <div className='Chatbubble'>{props.msgText}</div>
  )
}