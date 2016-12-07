const React = require('react');

export default class SubmitButton extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Push Me!'
    }
  }

  handleSubmit() {
    console.log(this);
  }

  render() {
    return (
      <button className='submitButton'
              onClick={() => {
                this.handleSubmit();
              }}
                 >
                 Submit
               </button>
    )
  }
}
