import React, {Component} from 'react';
import moment from 'moment';
import HourlyCard from './hourlyCard';

export default class ShowHourly extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const hourlyData = this.props.data.hourly.timeBreakDown;
    hourlyData.map((hour, index) => {
      const time = (index + 1);
      const currentHour = 'hour' + (index + 1)
      const temp = hour[currentHour].temp;
      const type = hour[currentHour].type;
      return (
        <div>
          <p>Hey</p>
          <p></p>
        </div>
      )
    });
    // const hourlyData = this.props.data.hourly.timeBreakDown;
    // return (
    //   hourlyData.map((hour, index) => {
    //     const time = (index + 1);
    //     const currentHour = 'hour' + (index + 1)
    //     const temp = hour[currentHour].temp;
    //     const type = hour[currentHour].type;
    //       <div>
    //         <p>Hey</p>
    //         <p></p>
    //       </div>
    //   })
    // )
  }
}
