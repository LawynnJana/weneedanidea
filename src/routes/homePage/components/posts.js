import React, { Component } from 'react';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PostList from './postList';
import { fetchPosts } from '../actions';
import './posts.css';

class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeClass: 'old',
    }
  }

  componentWillMount() {
    console.log("Fetch posts");
    this.props.fetchPosts();
  }

  handleActiveTab(activeClass){
     this.setState({
       activeClass,
     })
  }

  render () {
    return(
      <div className="container">
        <ul className="nav nav-tabs" >
          <li role="presentation" onClick={() => this.handleActiveTab('old')} className={(this.state.activeClass === 'old') ? 'active' : '' }><Link to='/user/posts'>Old</Link></li>
          <li role="presentation" onClick={() => this.handleActiveTab('new')} className={(this.state.activeClass === 'new') ? 'active' : '' }><Link to='/user/posts/new'>New</Link></li>
          <li role="presentation" onClick={() => this.handleActiveTab('likes')} className={(this.state.activeClass === 'likes') ? 'active' : '' }><Link to='/user/posts/likes'>Likes</Link></li>
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
