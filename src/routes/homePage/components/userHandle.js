import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { submitUserHandle } from '../actions';


class UserHandle extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    //check if username already exists and user is logged in
  }
  onSubmit(values){
    //make a call to store userHandle in dbref/UserHandles
    console.log("submit clicked");
    this.props.submitUserHandle(values, () => {
      this.props.history.push('/');
    });
  }

  renderField(field){

    const { meta: {touched, error} } = field;
    const className = `text-help ${touched && error ? 'has-danger' : ''}`
    return (
      <div className="form-group">
        <div>
          <label>User handle:</label>
          <div><input className="form-control" type="text" placeholder="ex. johndoe123" {...field.input}/></div>
        </div>
        <div className={className}>
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h1 className="panel-title">You do not have a user handle yet, please enter on in before continuing!</h1>
            </div>
            <div className="panel-body">
              <form className="form-horizontal col-md-10" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                  label="AccountHandle"
                  name="accountHandle"
                  component={this.renderField}>
                </Field>
                <div className="btn-toolbar">
                  <button type="submit" className="btn btn-info">Submit</button>
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
  //check if acc handle valid?

  if(!values.accountHandle){
    errors.accountHandle = "Account handle cannot be empty!";
  }
  return errors;
}

export default withRouter(reduxForm({
  validate,
  form: 'userHandleForm'
})(
  connect(null, { submitUserHandle })(UserHandle)
));
