import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { firebaseApp } from '../../../firebase';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import { submitProfileChanges } from '../actions';

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

const renderField = field => {
  const { meta: {touched, error} } = field;
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

const FileInput = ({
  photoURL,
  input: {
    value: omitValue,
    ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) => {

  function onImageClick(){
    $('#myInput').click();
    //change redux photoUrl state
  }

  function onImageUpload(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      //call action
      let imageSrc = reader.result
      console.log("Image source:", imageSrc)
      console.log("file: ",file)
      //this.props.changePicture(file, imageSrc)
    }
    reader.readAsDataURL(file);
  }

  return  (
    <div>
      <input
      id="myInput"
      style={{visibility: 'hidden', position: 'absolute'}}
      type="file"
      {...inputProps}
      {...props}
      accept="image/png, image/jpg, image/jpeg"
      onChange={onImageUpload}
      />
    <img alt="" className="edit-profile-pic" onClick={onImageClick} src={photoURL}/>
  </div>)
}

class Editable extends Component {
  constructor(props){
    super(props)
  }
  handleProfileSubmit(values){
    this.props.submitProfileChanges(values);
  }

  render(){

    const { user, onclick } = this.props;
    console.log("user",user);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card hovercard">
              <div className="cardheader" style={{background: '#fff5f1'}}>
                <button onClick={onclick} className="btn btn-info">Edit Profile</button>
              </div>
              <form >
                  <div className="row avatar">
                    <Field
                      name="profile_pic"
                      photoURL={user.photoURL}
                      component={FileInput}
                      type="file"
                    />
                  </div>
                  <div className="info">
                    <div className="title">
                      <Field
                        label={user.accountHandle}
                        inputType="text"
                        name="account_handle"
                        inputClassName="glyphicon glyphicon-user"
                        component={renderField} />
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


function validate(values){
  const errors = {};
  console.log("Validate:" ,values.profile_pic)
  return errors;

}

export default withRouter(reduxForm({
  validate,
  form: 'Profileform'
})(Profile));
