import React, { Component } from 'react';
import './App.css';
import './Chatbox.css'
import AccountManager from './AccountManager';
import ChatboxManager from './ChatboxManager';
import Dexie from 'dexie'

import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
    this.db = new Dexie('MessageDatabase');
    this.db.version(1).stores({
      chats: "++id, *usernames"
    })
    this.db.chats.put({
      id: 1,
      usernames: ['mav', 'minsun'], 
      messages: [
        {message:'hi maverick', sender:'minsun'}, 
        {message:'hi minsun', sender:'mav'}
      ]
    })
    this.db.chats.put({
      id: 2,
      usernames: ['mav', 'bobert'], 
      messages: [
        {message:'hi maverick', sender:'bobert'}, 
        {message:'heya bobert', sender:'mav'}
      ]
    })
    this.db.chats.put({
      id: 3,
      usernames: ['mav', 'alice'], 
      messages: [
        {message:'hi maverick', sender:'alice'}, 
        {message:'heya alice', sender:'mav'}
      ]
    })
  }

  async loadMessages(username) {
    const chatHistory = await this.db.chats.where('usernames').equals(username).toArray()
    const chatboxes = chatHistory.map(chatObj => {
      const recipient = chatObj.usernames.filter(name => name !== username)[0]
      const messages = chatObj.messages
      return { recipient, messages }
    })
    return chatboxes
  }

  async login(username) {
    if (username) {
      console.log('Logging in:', username)
      const socket = io('localhost:5000');
      socket.on('connect', () => {
        console.log('wow, connected!')
        socket.emit('message', `hello it's me, ${username}`)
      })
      const chatboxes = await this.loadMessages(username)
      this.setState({ username, socket, chatboxes })
    }
  }

  logout() {
    console.log('Logging out:', this.state.username)
    this.setState({ username: null })
  }
  
  render() {
    return (<div className='Main'>
      <div className='Border'>
        <h2 className='WelcomeHeader'>
          <AccountManager onLogin={async (username) => await this.login(username)}
                          onLogout={() => this.logout()} 
                          username={this.state.username}
                          />
        </h2>
        {this.state.username && 
          <div>
            <h3 className='WelcomeHeader'>
              Welcome, {this.state.username}
            </h3>
            <div>
              <ChatboxManager chatboxes={this.state.chatboxes} />
            </div>
          </div>
        }
      </div>
    </div>)
  }
}

export default App;
