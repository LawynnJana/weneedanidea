import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchPosts } from '../actions'
class PostShow extends Component {
  componentWillMount(){
    //const { id } = this.props.match.params;
    //this.props.fetchPost(id);
    this.props.fetchPosts();
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

export default connect(mapStateToProps, { fetchPost, fetchPosts })(PostShow);
