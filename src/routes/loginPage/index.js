import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginRequest } from './actions'

class Login extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loginRequest("resetState");
  }

  //Returns a component for a Field
  renderField(field) {

    // touched is an indicator if the field was ever clicked on
    // error is true if validate() returned errors
    const { meta: {touched, error} } = field;

    // If field was touched and user input isn't satisfied, add has-danger to class
    const className = `text-help ${touched && error ? 'has-danger' : ''}`
    return (
      <div className="form-group">

        <div className="input-group">
          <span className="input-group-addon" id="sizing-addon1"><i className={field.inputClassName}></i></span>
          <input
            type={field.inputType}
            className="form-control"
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

  // Handles submitting of form
  onSubmit(values){

    // Try to log in with given username and password
    this.props.loginRequest(values, () => {
      //redirect to user's homepage
      this.props.history.push('/');
    });

  }
  render() {

    // handleSubmit passed by redux-router, calls validate() on submitting
    const { handleSubmit } = this.props;

    return(

      // <Field>'s name is connected to the form object
      // the name is then used to validate the field item (i.e. empty)
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title"><strong>Sign In </strong></h3>
            </div>

            <div className="panel-body">
              <form className="form-horizontal col-md-8" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                  label="E-mail"
                  inputType="text"
                  name="username"
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
                <div className="text-help">{this.props.status.error === true ? this.props.status.message : ''}</div>
                <div className="btn-toolbar">
                    <button type="submit" className="btn btn-info">Login</button>
                    <Link className="btn btn-warning pull-right" to="/register">Register</Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Called when form is submitted, to ensure form values are correct
// Params: values => contains the fields from the form
// Return: {} that contains errors
function validate(values) {

  const errors = {};
  // Are username and password empty?
  if(!values.username || values.username.length === 0) {
    errors.username = "Enter a username!";
  }
  if(!values.password || values.password.length === 0) {
    console.log('abc');
    errors.password = "Enter a password!";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    status: state.loginStatus
  }
}

export default reduxForm({
  validate,
  form: 'LoginForm' // Must be unique from other forms in Application
})(
  connect(mapStateToProps, { loginRequest })(Login)
);
