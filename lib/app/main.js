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
    const target = this.state.location.toLowerCase();
    $.get(this.props.source + target, (data) => {
      this.setState({ weather: data }, localStorage.setItem('location', target));
    });
    this.setState( { location: ''} )
  }

  enterKeyFunctionality(e) {
    if(e.keyCode === 13) {
      this.getWeatherData();
    }
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
                 value={this.state.location}
                 placeholder='Enter a Location'
                 onKeyDown={this.enterKeyFunctionality.bind(this)}
                 onChange={this.updateValue.bind(this)}
                 >
          </input>
          <SubmitButton className='submitButton'
                        text='GO'
                        handleSubmit={this.getWeatherData.bind(this)}/>
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
            return <WeatherRow data={data} key={data.date}/>;
          })}
        </ul>
      </div>
    );
  };

  const WeatherRow = ({ data }) => {
    return (
      <div className='dataTable'>
          <p className='date'>{data.date}</p>
          <p className='location'>{data.location}</p>
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

ReactDOM.render(<Main source='http://weatherly-api.herokuapp.com/api/weather/' />, document.querySelector('.application'));
