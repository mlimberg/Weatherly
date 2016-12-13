import React, { Component } from 'react';
import moment from 'moment';
import ShowHourly from './showHourly';

export default class WeatherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHourly: false,
    };
  }

  setHourly() {
    this.setState({ showHourly: !this.state.showHourly });
  }

  render() {
    const weatherImage = {
      snow: './lib/app/images/snowy.svg',
      sunny: './lib/app/images/sunny.svg',
      cloudy: './lib/app/images/cloudy.svg',
      foggy: './lib/app/images/foggy.svg',
      rain: './lib/app/images/rainy.svg',
      'thunder storms': './lib/app/images/thunder-storms.svg',
      windy: './lib/app/images/windy.svg',
    };

    const data = this.props.data;
    const percent = `${Math.round(data.weatherType.chance * 100)}%`;
    const tempHigh = `${data.temp.high}\xB0`;
    const tempLow = `${data.temp.low}\xB0`;
    const condition = `${data.weatherType.type}`;
    return (
      <div className='dataTable' key={data.date}>
        <table>
          <tbody>
            <tr>
              <td className='weatherData' id='weather-date'>{moment(data.date).format('dddd')}</td>
              <td className='weatherData'><img className='weatherImg' src={weatherImage[condition]} alt={condition + ' image'} /></td>
              <td className='weatherData' id='weather-type'>{condition}</td>
              <td className='weatherData'>{percent}</td>
              <td className='weatherData'>{tempHigh}</td>
              <td className='weatherData'>{tempLow}</td>
            </tr>
          </tbody>
        </table>
        <p className='weather-summary'>
          There is a {percent} chance that its {data.weatherType.type}. The high will be {data.temp.high} with a low of {data.temp.low}
        </p>

        <button className='showHourlyBtn' onClick={this.setHourly.bind(this)}>Hourly Breakdown</button>
        {this.state.showHourly && <ShowHourly data={data} />}

      </div>
    );
  }
}
