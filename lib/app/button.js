import React from 'react';

export default class SubmitButton extends React.Component {

  render() {
    return (
      <button className={this.props.className}
              disabled={this.props.disabled}
              onClick={this.props.handleSubmit}
              tabIndex='0'
              >
        {this.props.text}
      </button>
    );
  }
}
