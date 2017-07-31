import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchPosts, deletePost, likePost } from '../actions'
import { withRouter } from 'react-router-dom';
import './postShow.css';
import Post from './post';

class PostShow extends Component {
  componentWillMount(){
    //const { id } = this.props.match.params;
    //this.props.fetchPost(id);
    this.props.fetchPosts();
  }

  handleDelete(){
    this.props.deletePost(this.props.post.postId, () => {
      this.props.history.push('/user/posts');
    });
  }

  render() {
    const { post } = this.props;
    return (
      <div className="row" id="postShow">
        {post ?
          (<Post post={post} editable='true' onDelete={this.handleDelete.bind(this)}/>)
          :(<div>Loading this post</div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts[ownProps.match.params.id]
  }
}

export default withRouter(connect(mapStateToProps, { fetchPost, fetchPosts, deletePost})(PostShow));
