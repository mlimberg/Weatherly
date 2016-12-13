import React, { Component } from 'react';
import moment from 'moment';
import WeatherCard from './weatherCard';

export default class WeatherContainer extends Component {

  severeWeatherAlert(data) {
    const extremeDays = data.filter((day) => {
      return day.weatherType.scale === 3;
    });
    return extremeDays.map((day) => {
      let betterName;
      if (day.weatherType.type === 'sunny') {
        betterName = 'sun';
      } else if (day.weatherType.type === 'foggy') {
        betterName = 'fog';
      } else {
        betterName = day.weatherType.type;
      }
      return (
        <div>
          <p key={day.date}>
            Likelihood of EXTREME {betterName} on {moment(day.date).format('LL')}
          </p>
        </div>
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
      <div className='welcomeMessage'>Welcome to Weatherly!</div>
    );
  }

  setLocationHeader(city) {
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
  }

  displayTableHeader() {
    return (
      <table>
        <tbody>
          <tr className='topRow'>
            <td className='weatherData weatherHeader'>DAY</td>
            <td className='weatherData weatherHeader'></td>
            <td className='weatherData weatherHeader'>CONDITION</td>
            <td className='weatherData weatherHeader'>CHANCE</td>
            <td className='weatherData weatherHeader'>HIGH</td>
            <td className='weatherData weatherHeader'>LOW</td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const { data } = this.props;
    if (!data) {
      return this.welcomeToWeatherly();
    } else if (!data.length) {
      return this.locationNotFound();
    } else if (data.length) {
      const location = data[0].location;
      const currentPlace = this.setLocationHeader(location);
      return (
        <div className='weatherList'>
          <h1 className='locationHeader'>{currentPlace}</h1>
          <div className='weatherAlert'>
          <h1 className='warningMessage'>WARNING!</h1>
          {this.severeWeatherAlert(data)}
          </div>
            {this.displayTableHeader()};
            {data.map((weather) => {
              return <WeatherCard data={weather} key={weather.date}/>;
            })}
        </div>
      );
    }
  }
}
