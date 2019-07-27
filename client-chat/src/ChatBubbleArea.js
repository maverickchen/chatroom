import React from 'react';
import ChatBubble from './ChatBubble';

function ChatBubbleArea(props) {
  const chatBubbles = props.messages.map((msg, i) => {
    return <ChatBubble msgText={msg} key={i} />
  });

  return (
    <div className='Chatbubble-area'>
      {chatBubbles}
    </div>
  );
}

export default ChatBubbleArea;