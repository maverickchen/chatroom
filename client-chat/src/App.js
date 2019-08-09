import React, { Component } from 'react';
import './App.css';
import './Chatbox.css'
import AccountManager from './AccountManager';
import ChatboxManager from './ChatboxManager';
// import idb from './idb'

import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null, socket: null };
  }

  async login(username) {
    if (username) {
      console.log('Logging in:', username);
      const socket = io();
      socket.on('connect', () => {
        socket.emit('login-user', username);
      });
      this.setState({ username, socket });
    }
  }

  logout() {
    console.log('Logging out:', this.state.username);
    this.state.socket.disconnect(true);
    this.setState({ username: null, socket: null });
  }
  
  render() {
    return (
    <div className='Main'>
      <div className='Border'>
        <h2 className='WelcomeHeader'>
          <AccountManager 
            onLogin={async (username) => await this.login(username)}
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
              <ChatboxManager
                socket={this.state.socket}
                username={this.state.username}
              />
            </div>
          </div>
        }
      </div>
    </div>)
  }
}

export default App;
