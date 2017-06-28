import React, { Component } from 'react';
import { firebaseApp } from '../../../firebase';
import browserHistory from ''
export default class VerifyPage extends Component {

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user){
        if(!user.emailVerified){
          alert('You are not verified!');
          console.log(user.email);
          user.sendEmailVerification()
            .then(() => {
              alert("Email sent! @ validation.js");
            }, error => {
              alert("Error sending e-mail @ validation.js");
            })
        } else {
          alert('You are verified!');
          this.props.history.push('/');


        }
      }
      else {
        alert("No user is singed in");
      }
    });
  }

  render() {
    return (
      <div>

        <div>We notice that you are not verified! An e-mail has been sent to your e-mail address for verification!</div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label">Code:</label>
            <div className="controls">
              <input type="text" className="form-control"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
