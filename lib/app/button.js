import React from 'react'

export default class SubmitButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <button className={this.props.className}
              onClick={this.props.handleSubmit}
              >
        {this.props.text}
      </button>
    );
  }
}
