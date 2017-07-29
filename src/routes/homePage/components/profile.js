import React, { Component } from 'react';
import { firebaseApp } from '../../../firebase';
import Editable from './editProfile'
import './profile.css';

const getDob = date => {
  const months = ['Jan', 'Feb', 'Mar', 'May', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dob = new Date(date);
  return dob.getDate() + ' ' + months[dob.getMonth()] + ' ' + dob.getFullYear();
}
const NonEditable = props => {
  const { user, onclick } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-md-offset-2">
          <div className="card hovercard">
            <div className="cardheader" style={{background: '#8FEEE1'}}>
              <button onClick={onclick} className="btn btn-default">Edit Profile</button>
            </div>
            <div className="avatar">
                <img alt="" src={user.photoURL}/>
            </div>
            <div className="info">
              <div className="title">
                  {user.AccountHandle}
              </div>
              {user.FirstName &&   <div className="desc">{user.FirstName}</div>}
              {user.LastName &&   <div className="desc">{user.LastName}</div>}
              {user.Gender &&   <div className="desc">{user.Gender}</div>}
              {user.DateOfBirth && <div className="desc">Date of Birth: {getDob(user.DateOfBirth)}</div>}
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


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false
    }
    this.editProfile = this.editProfile.bind(this);
  }

  componentWillMount(){
    console.log("Profile.js mounted");
    //this.props.fetchUser(user.uid);
    this.setState({
      edit: false
    })
  }

  getSrc(){
    console.log("get source")
    return firebaseApp.storage().ref().child('images/default_profile_img.png').getDownloadURL().then((url) => {
      console.log("success", url);
      return url
    })

  }
  editProfile(){
    console.log("edit");
    this.setState({
      edit: !this.state.edit
    })
  }
  render() {
    return (<div>
      {
        this.state.edit ?
        <Editable {...this.props} onclick={this.editProfile}/>
        :<NonEditable {...this.props} onclick={this.editProfile}/>
      }
    </div>);
  }
}


export default Profile;
