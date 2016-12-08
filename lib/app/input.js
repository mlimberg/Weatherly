import React from 'react';
import $ from 'jquery';
import SubmitButton from './submitButton'

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
    };
  }

  updateLocation(e) {
    const value = e.target.value
    this.setState({ location: value })
  }

  render() {
    return (
      <div className='inputSection'>
        <h1 className='welcome'>Welcome, Get Some! (weather)</h1>
        <input className='userInput'
        type='text'
        name='location'
        value={this.state.location}
        onChange={(e) => {
          this.updateLocation(e);
        }}
        >
        </input>
        <SubmitButton />
      </div>
    );
  }
}
//
// module.exports = Input;
