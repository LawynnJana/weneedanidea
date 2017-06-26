import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerRequest } from './actions'

class Register extends Component {
  constructor(props){
    super(props);
  }
  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `text-help ${touched && error ? 'has-danger' : ''}`
    return (

      <div className="form-group">
          <label className="control-label" htmlFor={field.name}>{field.label}</label>
          <div className="controls">
        <input
            type={field.inputType}
            id={field.name}
            className="form-control"
            placeholder={field.label}
            {...field.input}
          />
      </div>
        <div className={className}>
          {touched ? error  : ''}
        </div>
      </div>

    );
  }

  onSubmit(values){
    console.log('Login');
    this.props.registerRequest(values, () => {
      this.props.history.push('/');
    });

  }
  render() {
    const { handleSubmit } = this.props;

    return(
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title"><strong>Register</strong></h3>
            </div>
            <div className="panel-body">
              <form className="form-horizontal col-md-8" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                  label="First Name"
                  inputType="text"
                  name="firstName"
                  inputClassName="glyphicon glyphicon-user"
                  component={this.renderField}>
                </Field>
                <Field
                  label="Last Name"
                  inputType="text"
                  name="lastName"
                  inputClassName="glyphicon glyphicon-user"
                  component={this.renderField}>
                </Field>
                <Field
                  label="E-mail"
                  inputType="text"
                  name="email"
                  inputClassName="glyphicon glyphicon-user"
                  component={this.renderField}>
                </Field>
                <Field
                  label="Password"
                  inputType="password"
                  name="password"
                  inputClassName="glyphicon glyphicon-lock"
                  component={this.renderField}>
                </Field>
                <div className="btn-toolbar">
                    <button type="submit" className="btn btn-info">Register</button>
                    <a className="btn btn-warning pull-right">Register</a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  //validate the inputs from 'values'
  if(!values.firstName || values.firstName.length === 0) {
    errors.firstName = "Enter a first name!";
  }
  if(!values.email || values.email.length === 0 || !values.email.includes("@")) {
    errors.email= "Enter a valid e-mail!";
  }
  if(!values.password || values.password.length === 0) {
    errors.password = "Enter a password!";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'registerForm'
})(
  connect(null, { registerRequest })(Register)
);
