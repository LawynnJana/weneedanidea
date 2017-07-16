import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchPosts, deletePost } from '../actions'
import { withRouter } from 'react-router-dom';

class PostShow extends Component {
  componentWillMount(){
    //const { id } = this.props.match.params;
    //this.props.fetchPost(id);
    this.props.fetchPosts();
  }
  handleDelete(){
    this.props.deletePost(this.props.post.id, () => {
      this.props.history.push('/user/posts');
    });
  }
  render() {
    const { post } = this.props;
    return (
      <div>
        {post ?
          <div>
            <h1>{post.title}</h1>
            <h3>{post.categories}</h3>
            <p>{post.content}</p>
            <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
          </div>
          : <div>Loading this post</div>
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

export default withRouter(connect(mapStateToProps, { fetchPost, fetchPosts, deletePost })(PostShow));
