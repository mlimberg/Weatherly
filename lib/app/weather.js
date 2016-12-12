import React from 'react';
import moment from 'moment';

export default class DisplayWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  // severeWeatherAlert() {
  //
  // }
  //
  // locationNotFound() {
  //   return ()
  // }

  render() {
    const data = this.props.data;
    moment().format('MMM Do YY');
    if (!data) {
      return (
        <div> Welcome to Weatherly! </div>
      );
    } else if (!data.length) {
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
            <table>
              <tbody>
                <tr className='topRow'>
                  <td className='weatherData weatherHeader'>DATE</td>
                  {/* <td className='weatherData weatherHeader'>IMG</td> */}
                  <td className='weatherData weatherHeader'>CONDITION</td>
                  <td className='weatherData weatherHeader'>CHANCE</td>
                  <td className='weatherData weatherHeader'>HIGH</td>
                  <td className='weatherData weatherHeader'>LOW</td>
                </tr>
              </tbody>
            </table>
          <ul>
            {data.map((weather) => {
              return <li key={weather.date}><WeatherCard data={weather}/></li>;
            })}
          </ul>
        </div>
      );
    }
  }
}

  const WeatherCard = ({ data }) => {
    const percent = `${Math.round(data.weatherType.chance * 100)}%`;
    const tempHigh = `${data.temp.high}\xB0`;
    const tempLow = `${data.temp.low}\xB0`;
    const condition = `${data.weatherType.type}`;
    return (
      <div className='dataTable'>
        <table>
          <tbody>
            <tr>
              <td className='weatherData' id='weather-date'>{data.date}</td>
              {/* <td><img src='images/snowy.svg' alt={condition + ' image'}/></td> */}
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
