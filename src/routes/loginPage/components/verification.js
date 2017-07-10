import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firebaseApp } from '../../../firebase';
import browserHistory from ''

class VerifyPage extends Component {

  //verificaiton page when they sign in
  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(!user){
        this.props.history.push('/login');
      } else if(user && user.emailVerified){
        this.props.history.push('/');
      } else if(user && !user.emailVerified){
        user.sendEmailVerification().then(()=>{
          alert("Email sent!");
        }).catch(() => console.log("Error email verification"));
      }
    });
  }

  onSendEmail(){
    const user = firebaseApp.auth().currentUser;
    if(user){
      console.log(user);
      if(!user.emailVerified){
        user.sendEmailVerification()
          .then(() => {
            alert("Email sent!");
          }, error => {
            alert("Error sending e-mail @ validation.js");
          })
      } else {
        alert("You are verified");
        this.props.history.push('/');
      }
    }
    else if(!user){
      alert("No user is singed in");
    }
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.onSendEmail}>Send Verificaition E-mail</button>
        <div>We notice that you are not verified! An e-mail has been sent to your e-mail address for verification!</div>
      </div>
    );
  }
}

export default withRouter(VerifyPage);
