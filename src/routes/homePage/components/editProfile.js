import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitProfileChanges } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import './profile.css';
import './editProfile.css';

const renderField = field => {
  const { meta: {touched, error} } = field;
  const className = `text-help ${touched && error ? 'has-danger' : ''}`
  return (
    <div className="form-group col-xs-8 col-sm-4 col-sm-offset-4 col-xs-offset-2 col-md-8 col-md-offset-2">
      <div className="input-group">
        <span className="input-group-addon" style={{color: '#5c6bc0', background: 'white'}} id="sizing-addon1"><i className={field.inputClassName && field.inputClassName}></i></span>
        <input
          type={field.inputType}
          className="form-control input-sm"
          placeholder={field.label && field.label}
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


const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  photoURL,
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) => {

  const onImageClick = () => $('#myInput').click();

  return  (
    <div>
      <input
      id="myInput"
      style={{visibility: 'hidden', position: 'absolute'}}
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
      {...props}
      accept="image/png, image/jpg, image/jpeg"

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
      <div className="container" id="edit">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-md-offset-3">
            <div className="card hovercard">
              <div className="cardheader" style={{background: '#5c6bc0'}}>
                <div onClick={onclick} className="button raised"><span>Done</span></div>
              </div>
              <form onSubmit={handleSubmit(this.handleProfileSubmit.bind(this))}>
                  <div className="row avatar">
                    <Field
                      name="picture"
                      photoURL={user.photoURL}
                      component={FileInput}
                    />
                  </div>
                  <div className="info">
                    <div className="title row">
                      <Field
                        label={user.AccountHandle}
                        inputType="text"
                        name="accountHandle"
                        inputClassName="glyphicon glyphicon-user"
                        component={renderField} />
                      <Field
                        label={user.FirstName ? user.FirstName : 'First Name'}
                        inputType="firstName"
                        name="firstName"
                        inputClassName="fa fa-user-o"
                        component={renderField} />
                      <Field
                        label={user.LastName ? user.LastName : 'Last Name'}
                        inputType="text"
                        name="lastName"
                        inputClassName="fa fa-user-o"
                        component={renderField} />
                      <div  className="form-group col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                        <h4>Gender</h4>
                        <div>
                          <h6><Field name="gender" component="input" type="radio" value="Male"/> Male</h6>
                          <h6><Field name="gender" component="input" type="radio" value="Female"/> Female</h6>
                        </div>
                      </div>
                      <Field
                        inputType="date"
                        name="dateOfBirth"
                        inputClassName="fa fa-birthday-cake"
                        component={renderField} />
                    </div>
                    <div className="desc"></div>
                    <div className="desc"></div>
                    <div className="desc"></div>
                  </div>
                  <div className="cardfooter">
                    <button className="btn btn-primary" style={{color: 'white', background: '#5c6bc0', marginTop: '-25px'}} type="submit">Save</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  return errors;
}

export default withRouter(reduxForm({
  validate,
  form: 'Profileform'
})(
  connect(null, { submitProfileChanges })(Editable)
));
