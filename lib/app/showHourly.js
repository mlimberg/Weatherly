import React, { Component } from 'react';
import moment from 'moment';

export default class ShowHourly extends Component {

  setHourlyArray() {
    const hourlyData = this.props.data.hourly.timeBreakDown;
    const hourlyArray = hourlyData.map((hour, index) => {
      const time = (index + 1);
      const currentHour = 'hour' + (index + 1);
      const temp = hour[currentHour].temp;
      const type = hour[currentHour].type;
      return (
        <div className='hourlyCard' key={time}>
          <p className='hourlyTime'>{time + ':00'}</p>
          <div className='hourlyInfo'>
            <p>Temp: {temp + '\xB0'}</p>
            <p>Condition: {type}</p>
          </div>
        </div>
      );
    });
    return hourlyArray;
  }

  render() {
    return (
      <div>
        {this.setHourlyArray()}
      </div>
    );
  }
}
