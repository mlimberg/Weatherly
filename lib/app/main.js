import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Input from './input';
import SubmitButton from './submitButton';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Input />
      </div>
    );
  }
}

// componentDidMount() {
//
// }

ReactDOM.render(<Main />, document.querySelector('.application'));
