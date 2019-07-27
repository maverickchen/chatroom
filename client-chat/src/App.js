import React from 'react';
import './App.css';
import Chatbox from './Chatbox';
import './Chatbox.css'

function App() {
  return (
    <div className='Main'>
      <div className='Border'>
        <h1 className='WelcomeHeader'> 
          Welcome, Maverick
        </h1>
        <div className='Chatboxes'>
          <Chatbox recipient='Alice' />
          <Chatbox recipient='Bobert' />
          <Chatbox recipient='Charlice' />
          <Chatbox recipient='Derengel' />
          <Chatbox recipient='Elipid' />
          <Chatbox recipient='Frommort' />
          <Chatbox recipient='Geremere' />
          <Chatbox recipient='Herrilerri' />
        </div>
      </div>
    </div>
  );
}

export default App;
