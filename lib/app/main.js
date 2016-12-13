import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SubmitButton from './button';
import Welcome from './welcome';
import DisplayWeather from './displayWeather';
import moment from 'moment';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      location: '',
    };
  }

  componentDidMount() {
    const storedWeather = localStorage.getItem('weather');
    this.setState({ weather: storedWeather ? JSON.parse(storedWeather) : null });
  }

  updateValue(e) {
    const value = e.target.value;
    this.setState({ location: value.toUpperCase() });
  }

  storeWeather(key, content) {
    localStorage.setItem(key, JSON.stringify(content));
  }

  getWeatherData() {
    const city = this.state.location;
    let target = '';
    if (city === 'DENVER' || city === 'DENVER, CO') {
      target = 'denver';
    } else if (city === 'SAN DIEGO' || city === 'SAN DIEGO, CA') {
      target = 'san-diego';
    } else if (city === 'SAN FRANCISCO' || city === 'SAN FRANCISCO, CA') {
      target = 'san-fransico';
    } else if (city === 'CASTLE ROCK' || city === 'CASTLE ROCK, CO') {
      target = 'castle-rock';
    } else {
      target = city;
    }
    $.get(this.props.source + target, (data) => {
      this.setState({ weather: data }, this.storeWeather('weather', data));
    });
    this.setState({ location: '' });
  }

  enterKeyFunctionality(e) {
    if (e.keyCode === 13) {
      this.getWeatherData();
    }
  }

  render() {
    return (
      <div className='weatherPage'>
        <div className='header'>
          <h1 className='mainHeader'>Weather!</h1>
          <div className='searchSection'>
            <input className='userInput'
              value={this.state.location}
              placeholder='Enter a Location'
              onKeyDown={this.enterKeyFunctionality.bind(this)}
              onChange={this.updateValue.bind(this)}
              >
            </input>
            <SubmitButton className='submitButton'
                disabled={!this.state.location}
                text='GO'
                tabIndex='0'
                handleSubmit={this.getWeatherData.bind(this)} />
          </div>
        </div>
          <DisplayWeather data={this.state.weather}/>
      </div>
    );
  }
}

ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' />, document.querySelector('.application'));
