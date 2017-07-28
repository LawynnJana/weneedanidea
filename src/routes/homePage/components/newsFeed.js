import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchNewsFeed } from '../actions';


class NewsFeed extends Component{
  componentDidMount(){
    //this.props.fetchNewsFeed();
  }
  render() {
    return (
      <div>
        <h1>News feed goes here...</h1>
      </div>
    )
  }
}

export default connect(null, {})(NewsFeed);
