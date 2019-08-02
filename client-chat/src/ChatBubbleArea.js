import React from 'react';
import ChatBubble from './ChatBubble';

function ChatBubbleArea(props) {
  const chatBubbles = props.messages.map((msg, i) => {
    return <ChatBubble source={msg.source} message={msg.message} key={i} />
  });

  // if (chatBubbles.length > 0) {
  //   chatBubbles[chatBubbles.length-1].scrollIntoView({behavior: 'smooth'});
  // }

  return (
    <div className='Chatbubble-area'>
      {chatBubbles}
    </div>
  );
}

export default ChatBubbleArea;