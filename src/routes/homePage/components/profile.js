import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firebaseApp } from '../../../firebase';
class Profile extends Component {

  componentWillMount(){
    console.log("Profile.js mounted");
  }

  getSrc(){
    console.log("get source")
    return firebaseApp.storage().ref().child('images/default_profile_img.png').getDownloadURL().then((url) => {
      console.log("success", url);
      return url
    })

  }
  render() {
    const { user } = this.props;
    return (
      <div className="container">
      	<div className="row">
      		<div className="col-sm-12">
            <div className="card hovercard">
              <div className="cardheader" style={{background: '#fff5f1'}}>
                <button className="btn btn-info">Edit Profile</button>
              </div>
              <div className="avatar">
                  <img alt="" src={user.photoURL}/>
              </div>
              <div className="info">
                <div className="title">
                    {user.accountHandle}
                </div>
                <div className="desc"></div>
                <div className="desc"></div>
                <div className="desc"></div>
              </div>
              <div className="bottom">
                    <a className="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/">
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a className="btn btn-danger btn-sm" rel="publisher"
                       href="https://plus.google.com/">
                        <i className="fa fa-google-plus"></i>
                    </a>
                    <a className="btn btn-primary btn-sm" rel="publisher"
                       href="https://plus.google.com/">
                        <i className="fa fa-facebook"></i>
                    </a>
                    <a className="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/">
                        <i className="fa fa-behance"></i>
                    </a>
                </div>
            </div>
          </div>
      	</div>
      </div>
    );
  }
}

export default withRouter(Profile);
