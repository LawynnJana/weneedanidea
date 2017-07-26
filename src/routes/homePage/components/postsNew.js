import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, fetchSubcategory } from '../actions';
import DropdownList from 'react-widgets/lib/DropdownList';
import _ from 'lodash';
//import 'react-widgets/dist/css/react-widgets.css'

const categories = [ { category: 'Cooking', value: 'cooking' },
  { category: 'Sports', value: 'sports' },
  { category: 'Education', value: 'education' } ];

const subcategories = {
  cooking:[
    {subcategory:'Snacks', value: 'snacks'},
    {subcategory:'Dinner', value: 'dinner'},
  ],
  education:[
    {subcategory:'Math', value: 'math'},
    {subcategory:'Computer Science', value: 'comp_sci'},
  ],
  sports:[
    {subcategory:'Ball', value: 'ball'},
    {subcategory:'Catch', value: 'catch'},
  ]
}

const FIELDS = {
  title: {
    type: 'input',
    label: 'Enter a title'
  },
  content: {
    type: 'textarea',
    label: 'Enter some content'
  }
}

class PostsNew extends Component {
  constructor(props){
    super(props);
    //this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.state = {
      subcategory: []
    }
  }

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
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error  : ''}
        </div>
      </div>
    )
  }

  changeSubcategories(event, newValue){
    console.log('new category:', newValue);
    this.setState({
      subcategory: subcategories[newValue.value]
    });

    //reset form
    this.props.dispatch(change('PostsNewForm', 'subcategory', ''))

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
    const { subcategory } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            type="text"
            component={this.renderField}
          />
          <label>Category</label>
          <Field
           name="category"
           component={this.renderDropdownList.bind(this)}
           data={categories}
           valueField="value"
           textField="category"
           onChange={this.changeSubcategories.bind(this)}
           />
          <Field
            label="Subcategory"
            name="subcategory"
            component={this.renderDropdownList.bind(this)}
            data={subcategory}
            valueField="value"
            textField="subcategory"
          />
          <Field
           label="Content"
           name="content"
           type="textarea"
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

  _.each(FIELDS, (type, field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`;
    }
  })

  if(!values.category) {
    errors.categories = "Enter a category!";
  }

  return errors;
}

export default withRouter(reduxForm({
  validate,
  form: 'PostsNewForm',
})(
  connect(null, { createPost, fetchSubcategory })(PostsNew)
));
