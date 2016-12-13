import React, {Component} from 'react';
import moment from 'moment';

export default class DisplayWeather extends Component {
  constructor(props) {
    super(props);
  }

  severeWeatherAlert(data) {
    const extremeDays = data.filter((day) => {
      return day.weatherType.scale === 3;
    });
    return extremeDays.map((day) => {
      let betterName;
      if(day.weatherType.type === 'sunny') {
        betterName = 'sun';
      } else if (day.weatherType.type === 'foggy') {
        betterName = 'fog';
      } else {
        betterName = day.weatherType.type;
      }
      return (
        <p key={day.date}>EXTREME WEATHER WARNING: Likelihood of EXTREME {betterName} on {moment(day.date).format('LL')} </p>
      );
    });
  }

  locationNotFound() {
    return (
      <div className='invalidCity'>
        Location not found. Please enter another location.
        <img className='errorImg' src='http://img.thesun.co.uk/aidemitlum/archive/02567/BARNEYNEW1_2567434al.jpg' width='600' height='350'/>
      </div>
    );
  }

  welcomeToWeatherly() {
    return (
      <div>Welcome to Weatherly!</div>
    );
  }

  render() {
    const {data} = this.props

    if (!data) {
      return this.welcomeToWeatherly();
    } else if (!data.length) {
      return this.locationNotFound();
    } else if (data.length) {
      const location = data[0].location;
      const currentPlace = setLocationHeader(location);
      return (
        <div className='weatherList'>
          <h1 className='locationHeader'>{currentPlace}</h1>
          {this.severeWeatherAlert(data)}
            <table>
              <tbody>
                <tr className='topRow'>
                  <td className='weatherData weatherHeader'>DATE</td>
                  <td className='weatherData weatherHeader'>IMG</td>
                  <td className='weatherData weatherHeader'>CONDITION</td>
                  <td className='weatherData weatherHeader'>CHANCE</td>
                  <td className='weatherData weatherHeader'>HIGH</td>
                  <td className='weatherData weatherHeader'>LOW</td>
                </tr>
              </tbody>
            </table>
            {data.map((weather) => {
              return WeatherCard(weather);
            })}
        </div>
      );
    }
  }
}

const WeatherCard = (data) => {

  let weatherImage = {
    'snow': './lib/app/images/snowy.svg',
    'sunny': './lib/app/images/sunny.svg',
    'cloudy': './lib/app/images/cloudy.svg',
    'foggy': './lib/app/images/foggy.svg',
    'rain': './lib/app/images/rainy.svg',
    'thunder storms': './lib/app/images/thunder-storms.svg',
    'windy': './lib/app/images/windy.svg',
  };

  const percent = `${Math.round(data.weatherType.chance * 100)}%`;
  const tempHigh = `${data.temp.high}\xB0`;
  const tempLow = `${data.temp.low}\xB0`;
  const condition = `${data.weatherType.type}`;
  return (
    <div className='dataTable' key={data.date}>
      <table>
        <tbody>
          <tr>
            <td className='weatherData' id='weather-date'>{moment(data.date).format('LL')}</td>
            <td className='weatherData'><img src={weatherImage[condition]} alt={condition + ' image'}/></td>
            <td className='weatherData' id='weather-type'>{condition}</td>
            <td className='weatherData'>{percent}</td>
            <td className='weatherData'>{tempHigh}</td>
            <td className='weatherData'>{tempLow}</td>
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
