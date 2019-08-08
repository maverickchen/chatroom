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

  // TODO: Add automatic scroll down
  // if (chatBubbles.length > 0) {
  //   chatBubbles[chatBubbles.length-1].scrollIntoView({behavior: 'smooth'});
  // }

  return (
    <div className='Chatbubble-area' id={props.scrollId}>
      {chatBubbles}
    </div>
  );
}

export default ChatBubbleArea;