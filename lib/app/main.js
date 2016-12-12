import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Input from './input';
import SubmitButton from './button';
import Welcome from './welcome';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      location: '',
      // welcome: true,
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
    } else if (city === 'SAN DIEGO' || city === 'SAN DIEGO, CA' || city === "A WHALES VAGINA") {
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
    let targetLocation = this.state.location.toLowerCase();
    // if (this.state.welcome === true) {
    //   window.setTimeout(() => {this.setState({ welcome: false })}, 3000);
    //   return (
    //     <div>Hey
    //     </div>
    //   )
    // } else {
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
                  handleSubmit={this.getWeatherData.bind(this)} />
            </div>
          </div>
            <DisplayWeather data={this.state.weather}/>
        </div>
      );
    // }
  }
}

const DisplayWeather = ({ data }) => {
  console.log(data)
  if (data === null) {
    return (
      <div> Welcome to Weatherly! </div>
    );
  } else if (data.length === 0) {
    return (
      <div className='invalidCity'>
        Location not found. Please enter another location.
        <img className='errorImg' src='http://img.thesun.co.uk/aidemitlum/archive/02567/BARNEYNEW1_2567434al.jpg' width='600' height='350'/>
      </div>
    );
  } else if (data.length) {
    const location = data[0].location;
    const currentPlace = setLocationHeader(location);
    return (
      <div className='weatherList'>
        <h1 className='locationHeader'>{currentPlace}</h1>
        <ul>
            {data.map((data) => {
              return <li key={data.date}><WeatherCard data={data}/></li>;
            })}
        </ul>
      </div>
    );
  }
};

  const WeatherCard = ({ data }) => {
    const percent = Math.round(data.weatherType.chance * 100) + '%';
    return (
      <div className='dataTable'>
        <table>
          <tbody>
            <tr>
            <td className='weather' id='weather-date'>{data.date}</td>
            <td className='weather' id='weather-type'>{data.weatherType.type}</td>
            <td className='weather' id='weather-temp'>{percent}</td>
            <td className='weather' id='weather-temp'>{data.temp.high + '\xB0'}</td>
            <td className='weather' id='weather-temp'>{data.temp.low + '\xB0'}</td>
          </tr>
        </tbody>
      </table>
          <p className='weather-summary'>
            There is a {percent} chance that it's {data.weatherType.type}. The high will be {data.temp.high} with a low of {data.temp.low}
          </p>
      </div>
    );
  };

const setLocationHeader = (city) => {
  let locationHeader;
  if (city === 'denver') {
    locationHeader = 'DENVER';
  } else if (city === 'san-diego') {
    locationHeader = 'SAN DIEGO';
  } else if (city === 'san-fransico') {
    locationHeader = 'SAN FRANCISCO';
  } else if (city === 'castle-rock') {
    locationHeader = 'CASTLE ROCK';
  }
  return locationHeader;
};

ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' />, document.querySelector('.application'));
