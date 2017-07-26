import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, fetchSubcategory } from '../actions';
import DropdownList from 'react-widgets/lib/DropdownList';
import _ from 'lodash';
//import 'react-widgets/dist/css/react-widgets.css'

const categories = [ { category: 'Cooking', value: 'cooking' },
  { category: 'Sports', value: 'sports' },
  { category: 'Education', value: 'education' } ];

const subCategories = {
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
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error  : ''}
        </div>

      </div>
    )
  }

  // handleCategoryChange(event){
  //   console.log('event', event.value);
  //   this.props.fetchSubcategory(event.value, subCategories);
  // }

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
  
  _.each(FIELDS, (type, field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`;
    }
  })

  if(!values.category) {
    errors.categories = "Enter a category!";
  }

  // If errors is empty, form in good to submit
  // If errors has any props, redux essumes form in invalid
  return errors;
}

const mapStateToProps = ({ subcategory }) => {
  return {
    subcategory
  }
}

export default withRouter(reduxForm({
  validate,
  form: 'PostsNewForm',
})(
  connect(mapStateToProps, { createPost, fetchSubcategory })(PostsNew)
));
