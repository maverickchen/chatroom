import React from 'react';
import ChatBubble from './ChatBubble';

function ChatBubbleArea(props) {
  const chatBubbles = props.messages.map((msg, i) => {
    return <ChatBubble 
              sender={msg.sender !== props.recipient}
              message={msg.message}
              key={i}
              />
  });

  return (
    <div className='Chatbubble-area' id={props.scrollId}>
      {chatBubbles}
    </div>
  );
}

export default ChatBubbleArea;