import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import DropdownList from 'react-widgets/lib/DropdownList';

//import 'react-widgets/dist/css/react-widgets.css'

const categories = [ { category: 'Cooking', value: 'cooking' },
  { category: 'Sports', value: 'sports' },
  { category: 'Education', value: 'education' } ];

class PostsNew extends Component {

  componentDidMount() {
    console.log("postsNew.js mounted");
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

  renderDropdownList ({ input, data, valueField, textField }){
    return (
      <DropdownList {...input}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={input.onChange} />
    );
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
          <label>Category</label>
          <Field
           name="category"
           component={this.renderDropdownList.bind(this)}
           data={categories}
           valueField="value"
           textField="category"/>

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
  // if(!values.categories) {
  //   errors.categories = "Enter a category!";
  // }

  if(!values.content) {
    errors.content = "Enter some content!";
  }

  // If errors is empty, form in good to submit
  // If errors has any props, redux essumes form in invalid
  return errors;
}

export default withRouter(reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
));
