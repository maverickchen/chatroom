import React from 'react';
import './App.css';
import './Chatbox.css'
import SignIn from './SignIn';
import ChatboxManager from './ChatboxManager';

const username = 'Mav';

function App() {
  const chatboxes = [
    { recipient: 'Alice', messages: [] },
    { recipient: 'Bobert', messages: [] },
    { recipient: 'Charlice', messages: [] },
    { recipient: 'Derengel', messages: [] }
  ];

  return (
    <div className='Main'>
      <div className='Border'>
        {!username && 
          <h1 className='WelcomeHeader'>
            <SignIn />
          </h1>
        }
        {username && 
          <div>
            <h1 className='WelcomeHeader'>
              Welcome, {username}
            </h1>
            <div>
              <ChatboxManager chatboxes={chatboxes} />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
