import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Input from './input';
import SubmitButton from './button'

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: [],
      location: 'Denver',
    };
  }

  getWeatherData() {
    $.get('http://weatherly-api.herokuapp.com/api/weather', (data) => {
      this.setState({ weather: data });
      console.log(this.state.weather[0].location)
    });
  }

  render() {
    return (
      <div className='weatherPage'>
        <h1 className='welcome'>Welcome, Get Some!...weather</h1>
        <div className='searchSection'>
          <Input text='Get Some! (weather)'/>
          <SubmitButton className='submitButton' text='GO' handleSubmit={() => {
            this.getWeatherData()
          }}/>
        </div>
        {/* <WeatherTable data={this.state.weather}/> */}
        <DisplayWeather data={this.state.weather}/>
      </div>
    );
  }
}

  const DisplayWeather = ({ data }) => {
    return (
      <div className='weatherTable'>
        <ul>
          {data.map((data) => {
            return <WeatherRow date={data.date} location={data.location} />
          })}
        </ul>
      </div>
    )
  }

  const WeatherRow = ({ date, location }) => {
    return (
      <div>
        <p className='date'>{date}</p>
        <p className='location'>{location}</p>
      </div>
    )
  }


class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
  }

  showData(data) {
    return (
      <div className='dataRow'>
        <p>{data.date}</p>
        <p>{data.city}</p>
      </div>
    );
  }

  render() {
    return (
      <ul>
        {/* <li>{this.prop.data.map(this.showData)}</li> */}
      </ul>
    );
  }
}

ReactDOM.render(<Main />, document.querySelector('.application'));
