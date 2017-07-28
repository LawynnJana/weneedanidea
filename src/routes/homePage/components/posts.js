import React, { Component } from 'react';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostList from './postList';
import { fetchPosts } from '../actions';

class Posts extends Component {
  componentWillMount() {
    console.log("Fetch posts");
    this.props.fetchPosts();
  }
  render () {
    return(
      <div className="container">
        <div><h2>My Feed</h2></div>
          <ul className="nav nav-tabs">
            <li role="presentation" className="active"><Link to='/user/posts'>Created</Link></li>
            <li role="presentation" className="active"><Link to='/user/posts/new'>New</Link></li>
            <li role="presentation" className="active"><Link to='/user/posts/likes'>Likes</Link></li>
          </ul>

          <Switch>
            <Route path="/user/posts/new" render={() => <PostList type="new"/>} />
            <Route path="/user/posts/likes" render={ () => <PostList type="likes"/>} />
            <Route path="/user/posts" render={ () => <PostList type="created"/>} />

          </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchPosts })(Posts)
);
