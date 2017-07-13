import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitProfileChanges } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

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
    this.props.submitProfileChanges(values, () => {
      this.props.history.push('profile');
    });
  }

  render(){
    const { handleSubmit } = this.props;
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
              <form onSubmit={handleSubmit(this.handleProfileSubmit.bind(this))}>
                  <div className="row avatar">
                    <Field
                      name="imgSrc"
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
                        name="accountHandle"
                        inputClassName="glyphicon glyphicon-user"
                        component={renderField} />
                    </div>
                    <div className="desc"></div>
                    <div className="desc"></div>
                    <div className="desc"></div>
                  </div>
                  <div className="cardfooter">
                    <button className="btn btn-primary" type="submit">Save</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values){
  const errors = {};
  return errors;

}

export default withRouter(reduxForm({
  validate,
  form: 'Profileform'
})(
  connect(null, { submitProfileChanges })(Editable)
));
