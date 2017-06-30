// import React from 'react';
//
// const PostsNew = () => {
//   return (<div>new post</div>);
// }
//
// export default PostsNew;
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  componentDidMount() {
    console.log("New post component did mount");
  }
  renderField(field) {

    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error  : ''}
        </div>

      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });


  }
  render() {
    //passed by redux-form
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Tags"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Content"
            name="content"
            component={this.renderField}
          />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //console.log(values) -> { title: 'adbc', categories:'abc', content: 'gank'}
  const errors = {};

  //validate the inputs from 'values'
  if(!values.title || values.title.length < 3) {
    errors.title = "Enter a title! that is at least 3 characters!";
  }
  if(!values.categories) {
    errors.categories = "Enter a category!";
  }

  if(!values.content) {
    errors.content = "Enter some content!";
  }

  // If errors is empty, form in good to submit
  // If errors has any props, redux essumes form in invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
