import React, {Component} from 'react';
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
    this.setState({ showHourly: true });
  }

  render() {

    const weatherImage = {
      'snow': './lib/app/images/snowy.svg',
      'sunny': './lib/app/images/sunny.svg',
      'cloudy': './lib/app/images/cloudy.svg',
      'foggy': './lib/app/images/foggy.svg',
      'rain': './lib/app/images/rainy.svg',
      'thunder storms': './lib/app/images/thunder-storms.svg',
      'windy': './lib/app/images/windy.svg',
    };

    const data = this.props.data
    const percent = `${Math.round(data.weatherType.chance * 100)}%`;
    const tempHigh = `${data.temp.high}\xB0`;
    const tempLow = `${data.temp.low}\xB0`;
    const condition = `${data.weatherType.type}`;
    const hourlyData = data.hourly.timeBreakDown;
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
        <button onClick={this.setHourly.bind(this)}>Show Hourly</button>
        {this.state.showHourly &&
          hourlyData.map((hour, index) => {
            const time = (index + 1);
            const currentHour = 'hour' + (index + 1)
            const temp = hour[currentHour].temp;
            const type = hour[currentHour].type;
            return (
              <div className='hourlyCard'>
                {time + ':00'}
                <p>Temp: {temp + '\xB0'}</p>
                <p>Condition: {type}</p>
              </div>
            )
          })}
      </div>
    );
  };
}
