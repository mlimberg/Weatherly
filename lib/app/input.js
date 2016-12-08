import React from 'react';
import $ from 'jquery';

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
    };
  }

  updateLocation(e) {
    const value = e.target.value;
    this.setState({ location: value });
  }

  render() {
    return (
      <div className='inputSection'>
        <input className='userInput'
        type='text'
        name='location'
        value={this.state.location}
        onChange={(e) => {
          this.updateLocation(e);
        }}
        >
        </input>
      </div>
    );
  }
}
