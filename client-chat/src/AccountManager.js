import React, { Component } from 'react';
import './AccountManager.css'
import TextInput from './TextInput';


class AccountManager extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
    this.onLogin = props.onLogin;
    this.onLogout = props.onLogout;
  }

  handleSubmit(event, username) {
    if (event.key === 'Enter') {
      this.onLogin(username);
      return true;
    }
    return false;
  }

  renderSignIn() {
    return (<div className='Signin'>
    Welcome! Please log in.
    <TextInput 
      className='Text-input'
      onSubmit={(event, username) => {
          return this.handleSubmit(event, username);
        }
      }
    />
    </div>)
  }

  renderSignOut() {
    return (
      <div className='Signout'>
        Log out
        <button onClick={this.onLogout} className='invisible square'>
          <i className='material-icons'>
            exit_to_app
          </i>
        </button>
      </div>
    );
  }

  render() {
    const result = this.props.username ? this.renderSignOut() : this.renderSignIn();
    return result;
  }
}

export default AccountManager;