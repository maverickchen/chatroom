import React, { Component } from 'react';


/* 
 TextInput takes props onSubmit and className
 onSubmit will be called on every onKeyPress event; it must only 
 return true in the event submitted keyEvent is accepted.
 onSubmit will be given the key event object and the message.
 TextInput will clear its text input when onSubmit returns true.
 */
class TextInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = props.onSubmit;
    this.state = {
      inputValue: ''
    };
    this.className = props.className;
  }

  updateInputValue(event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  clearInput() {
    this.setState({
      inputValue: ''
    })
  }

  submit(event) {
    if (this.onSubmit(event, this.state.inputValue)) {
      this.clearInput();
    }
  }

  render() {
    return (
      <input className={this.className} value={this.state.inputValue}
            onChange={event => this.updateInputValue(event)}
            onKeyPress={event => this.submit(event)}
      />
    );
  }
}

export default TextInput;