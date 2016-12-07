const React = require('react');
const $ = require('jquery');

class Input extends React.Component {
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
      </div>
    );
  }
}

module.exports = Input;
