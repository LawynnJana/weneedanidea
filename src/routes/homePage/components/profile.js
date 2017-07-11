import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firebaseApp } from '../../../firebase';
import { Field, reduxForm } from 'redux-form';

const NonEditable = props => {
  const { user, onclick } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="card hovercard">
            <div className="cardheader" style={{background: '#fff5f1'}}>
              <button onClick={onclick} className="btn btn-info">Edit Profile</button>
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

//Returns a component for a Field
const renderField = (field) => {

  // touched is an indicator if the field was ever clicked on
  // error is true if validate() returned errors
  const { meta: {touched, error} } = field;

  // If field was touched and user input isn't satisfied, add has-danger to class
  const className = `text-help ${touched && error ? 'has-danger' : ''}`
  return (
    <div className="form-group col-xs-8 col-sm-4 col-sm-offset-4 col-xs-offset-2">

      <div className="input-group">
        <span className="input-group-addon" id="sizing-addon1"><i className={field.inputClassName}></i></span>
        <input
          type={field.inputType}
          className="form-control input-sm"
          placeholder={field.label}
          aria-describedby="sizing-addon1"
          {...field.input}
        />

      </div>
      <div className={className}>
        {touched ? error  : ''}
      </div>
    </div>

  );
}

function changeDisplay(){
  //
  alert("Choose an image");
}

const Editable = props => {
  const { user, onclick } = props;
  console.log("user",user);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="card hovercard">
            <div className="cardheader" style={{background: '#fff5f1'}}>
              <button onClick={onclick} className="btn btn-info">Edit Profile</button>
            </div>
            <form>
              <div className="avatar">
                  <img alt="" className="edit-profile-pic" onClick={changeDisplay} src={user.photoURL}/>
              </div>
              <div className="info">
                <div className="title">
                  <Field
                    label={user.accountHandle}
                    inputType="text"
                    name="accountHandle"
                    inputClassName="glyphicon glyphicon-user"
                    component={renderField}>
                  </Field>
                </div>
                <div className="desc"></div>
                <div className="desc"></div>
                <div className="desc"></div>
              </div>
            </form>
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


function validate(values){
  const errors = {};

  return errors;

}

export default withRouter(reduxForm({
  validate,
  form: 'Profileform'
})(Profile));
