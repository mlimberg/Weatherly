import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Input from './input';
import SubmitButton from './button'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      location: '',
      currentLocation: '',
      buttonDisabled: true,
    };
  }

  componentDidMount() {
    const storedWeather = localStorage.getItem('weather');
    this.setState({ weather: storedWeather ? JSON.parse(storedWeather) : [] });
  }

  updateValue(e) {
    const value = e.target.value;
    this.setState({ location: value.toUpperCase() });
    if (value.length > 0) {
      this.setState({ buttonDisabled: false });
    } else if (value.length === 0) {
      this.setState({ buttonDisabled: true });
    }
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
    this.setState({ currentLocation: city });
  }

  enterKeyFunctionality(e) {
    if (e.keyCode === 13) {
      this.getWeatherData();
    }
  }

  render() {
    let targetLocation = this.state.location.toLowerCase();
    return (
      <div className='weatherPage'>
        <div className='header'>
          <h1 className='welcomeMessage'>Weather!</h1>
          <div className='searchSection'>
            <input className='userInput'
                   value={this.state.location}
                   placeholder='Enter a Location'
                   onKeyDown={this.enterKeyFunctionality.bind(this)}
                   onChange={this.updateValue.bind(this)}
                   >
            </input>
            <SubmitButton className='submitButton'
                          disabled={this.state.buttonDisabled}
                          text='GO'
                          handleSubmit={this.getWeatherData.bind(this)} />
         </div>
        </div>
        <DisplayWeather data={this.state.weather}/>
      </div>
    );
  }
}

  const DisplayWeather = ({ data }) => {
    if (data === null) {
      return (
        <div> Welcome to Weatherly! </div>
      );
    } else if (data.length === 0) {
      return (
        <div className='invalidCity'>Location not found. Please enter another location.</div>
      );
    } else if (data.length > 0) {
      console.log(this)
      return (
        <div className='weatherList'>
          <h1 className='locationHeader'>hey</h1>
          <ul>
            <li>
              {data.map((data) => {
                return <WeatherCard data={data} key={data.date + data.location}/>;
              })}
            </li>
          </ul>
        </div>
      );
    }
  };

  const WeatherCard = ({ data }) => {
    return (
      <div className='dataTable'>
          <p className='date'>Date: {data.date}</p>
          <p className='weather-temp'>{data.weatherType.type}</p>
          <p className='weather-temp'>{data.weatherType.scale}</p>
          <p className='weather-temp'>{data.weatherType.chance}</p>
          <p className='weather-type'>{data.temp.high}</p>
          <p className='weather-type'>{data.temp.low}</p>
      </div>
    );
  };

ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' />, document.querySelector('.application'));
