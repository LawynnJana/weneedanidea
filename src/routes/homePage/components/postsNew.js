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

  renderDropdownList ({ type, input, data, valueField, textField }){
    //if(input.value.value && input.value.value === 'categor')
    console.log('input', input);
    let dataTemp = data;
    // if(type === 'subcategory'){
    //   console.log('subcat ', this.props.subcategory);
    //   if(!_.isEmpty(this.props.subcategory)){
    //     console.log('gang');
    //     dataTemp = this.props.subcategory;
    //   } else{
    //     dataTemp =[];
    //   }
    //
    // }
    return (
      <DropdownList {...input}
        data={dataTemp}
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
           type="category"
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

  console.log("guy",values);
  //validate the inputs from 'values'
  if(!values.title || values.title.length < 3) {
    errors.title = "Enter a title! that is at least 3 characters!";
  }
  if(!values.category) {
    errors.categories = "Enter a category!";
  }

  if(!values.content) {
    errors.content = "Enter some content!";
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
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, { createPost, fetchSubcategory })(PostsNew)
));
