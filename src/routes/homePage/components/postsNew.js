import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, fetchSubcategory } from '../actions';
import DropdownList from 'react-widgets/lib/DropdownList';
import _ from 'lodash';
import NavbarNewPost from './navbarNewPost.js';
import './postsNew.css';

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
      style={{ visibility: 'hidden', position: 'absolute'}}
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
      {...props}
      accept="image/png, image/jpg, image/jpeg"

      />
    <i className="fa fa-picture-o fa-2x post-img" aria-hidden="true" onClick={onImageClick} ></i>
  </div>)
}

class PostsNew extends Component {
  constructor(props){
    super(props);
    this.state = {
      subcategory: [],
      imgSrc: '',
    }
  }

  componentDidMount() {
    console.log("postsNew.js mounted");
  }

  renderInputField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <input
          className="form-control"
          placeholder={field.placeholder}
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error  : ''}
        </div>
      </div>
    )
  }

  renderTextAreaField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <textarea
          className="form-control"
          placeholder={field.placeholder}
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

  handleImageAdd(event, newValue){
    console.log('New src', newValue);
    const reader = new FileReader();
    const url = reader.readAsDataURL(newValue);
    reader.onloadend = function (e) {
      this.setState({
          imgSrc: reader.result
      })
    }.bind(this);

  }

  renderDropdownList ({ input, data, valueField, textField }){
    return (
      <DropdownList {...input}
        className="form-group"
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
    const { subcategory, imgSrc } = this.state;
    return (
      <div>
        <NavbarNewPost/>
        <div className="new-post row">
          <div className="col-md-8 col-md-offset-2">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                placeholder="Title"
                name="title"
                type="text"
                component={this.renderInputField}
              />
              <Field
                name="image"
                component={FileInput}
                onChange={this.handleImageAdd.bind(this)}
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
              { imgSrc !== '' && (<img src={imgSrc}/>) }
              <Field
                placeholder="Write your story here..."
                name="content"
                type="text"
                component={this.renderTextAreaField}
               />
              <button type="submit" className="btn btn-default">Submit</button>
              <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
          </div>
        </div>
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
