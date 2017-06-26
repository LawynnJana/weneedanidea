// import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
// import { loginRequest } from '../actions'
//
// class Login extends Component {
//   constructor(props){
//     super(props);
//   }
//   renderField(field) {
//     const { meta: {touched, error} } = field;
//     const className = `text-help ${touched && error ? 'has-danger' : ''}`
//     return (
//
//       <div className="form-group">
//         <div className="input-group">
//           <span className="input-group-addon" id="sizing-addon1"><i className={field.inputClassName}></i></span>
//           <input
//             type={field.inputType}
//             className="form-control"
//             placeholder={field.label}
//             aria-describedby="sizing-addon1"
//             {...field.input}
//           />
//         </div>
//         <div className={className}>
//           {touched ? error  : ''}
//         </div>
//       </div>
//
//     );
//   }
//
//   onSubmit(values){
//     console.log('Login');
//     this.props.loginRequest(values, () => {
//       this.props.history.push('/');
//     });
//
//   }
//   render() {
//     const { handleSubmit } = this.props;
//
//     return(
//       //passed by redux-form
//
//       // <Field>'s name is connected to the form object
//       // the name is then used to validate the field item (i.e. empty)
//       //
//       <div className="row">
//         <div className="col-md-12 col-lg-12">
//           <div className="panel panel-info">
//             <div className="panel-heading">
//               <h3 className="panel-title"><strong>Sign In </strong></h3>
//             </div>
//             <div className="panel-body">
//               <form className="form-horizontal col-md-8" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
//                 <Field
//                   label="Username"
//                   inputType="text"
//                   name="username"
//                   inputClassName="glyphicon glyphicon-user"
//                   component={this.renderField}>
//                 </Field>
//                 <Field
//                   label="Password"
//                   inputType="password"
//                   name="password"
//                   inputClassName="glyphicon glyphicon-lock"
//                   component={this.renderField}>
//                 </Field>
//                 <div className="btn-toolbar">
//                     <button type="submit" className="btn btn-info">Login</button>
//                     <a className="btn btn-warning pull-right">Register</a>
//                 </div>
//
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
//
// function validate(values) {
//   const errors = {};
//   //validate the inputs from 'values'
//   if(!values.username || values.username.length === 0) {
//     errors.username = "Enter a username!";
//   }
//   if(!values.password || values.password.length === 0) {
//     console.log('abc');
//     errors.password = "Enter a password!";
//   }
//
//   return errors;
// }
//
// export default reduxForm({
//   validate,
//   form: 'LoginForm'
// })(
//   connect(null, { loginRequest })(Login)
// );
