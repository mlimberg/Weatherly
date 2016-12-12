import React from 'react';

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      welcome: true,
    }
  }
  render() {
    if(this.state.welcome === true) {
      return (
        <div className='welcomePage'>
          HEY!
        </div>
      )
    } else {
      return
    }
  }
}
