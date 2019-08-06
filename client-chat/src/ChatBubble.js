import React from 'react';
import './Chatbox.css';

// Differentiate received and sent chat bubbles.
export default function ChatBubble(props) {
  if (props.sender) {
    return (
      <div className='Chatbubble-sent'>{props.message}</div>
    )
  }
  return (
    <div className='Chatbubble-received'>{props.message}</div>
  )
}