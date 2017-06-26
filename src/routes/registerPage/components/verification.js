import React, { Component } from 'react';

export default class VerifyPage extends Component {
  render() {
    return (
      <div>
        <div>An e-mail has been sent to your e-mail address for verification!</div>
        <label>Code:</label>
        <input type="text" />
      </div>
    );
  }
}
