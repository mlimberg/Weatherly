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
      location: '',
    };
  }

  updateValue(e) {
    const value = e.target.value;
    this.setState({ location: value });
  }

  getWeatherData() {
    let target = this.state.location.toLowerCase();
    $.get('http://weatherly-api.herokuapp.com/api/weather/' + target, (data) => {
      this.setState({ weather: data });
    });
  }

  render() {
    let targetLocation = this.state.location.toLowerCase();
    return (
      <div className='weatherPage'>
        <h1 className='welcome'>Welcome, Get Some!...weather</h1>
        <div className='searchSection'>
          <input className='userInput'
                 type='text'
                 name='location'
                 onChange={(e) => {
                   this.updateValue(e)
                 }}>
          </input>
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
            return <WeatherRow data={data} date={data.date} location={data.location} />;
          })}
        </ul>
      </div>
    );
  };

  const WeatherRow = ({ data, date, location }) => {
    return (
      <div className='dataTable'>
        <p className='date'>{date}</p>
        <p className='location'>{location}</p>
        <p className='weather-temp'>{data.weatherType.type}</p>
        <p className='weather-temp'>{data.weatherType.scale}</p>
        <p className='weather-temp'>{data.weatherType.chance}</p>
        <p className='weather-type'>{data.temp.high}</p>
        <p className='weather-type'>{data.temp.low}</p>
      </div>
    )
  }


class WeatherTable extends React.Component {
  constructor(props) {
    super(props);
  }

  showData(data) {
    return (
      <div>
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
