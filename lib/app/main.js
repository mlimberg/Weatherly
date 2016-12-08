import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Input from './input';
import SubmitButton from './button'

class Main extends React.Component {

  getWeatherData() {
    $.get('http://weatherly-api.herokuapp.com/api/weather', (data) => {

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
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.querySelector('.application'));
