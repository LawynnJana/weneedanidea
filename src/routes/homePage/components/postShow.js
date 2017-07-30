import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchPosts, deletePost } from '../actions'
import { withRouter } from 'react-router-dom';
import './postShow.css';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  handleShare(){

  }

  handleLike(){

  }

  handleDelete(){
    // this.props.deletePost(this.props.post.id, () => {
    //   this.props.history.push('/user/posts');
    // });
  }

  render(){
    const { post } = this.props;
    return (
      <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-8">
        <div className="page-header">
          <h1>{post.CardInfo.Title}</h1>
        </div>
        <div>
          {post.CardInfo.ImgSrc && <img className="img-main" src={post.CardInfo.ImgSrc}/>}
          <p className="well">{post.Body}</p>
        </div>
        <div className="footer">
          { this.props.editable && <span style={{cursor: 'pointer'}} onClick={this.handleDelete.bind(this)}><i className="fa fa-trash-o fa-2x" aria-hidden="true"></i></span>}
          <span style={{cursor: 'pointer'}} onClick={this.handleLike.bind(this)}><i className="fa fa-heart-o fa-2x" aria-hidden="true"></i></span>
          <span style={{cursor: 'pointer'}} onClick={this.handleShare.bind(this)}><i className="fa fa-share fa-2x" aria-hidden="true"></i></span>
        </div>
      </div>
    );
  }
}

class PostShow extends Component {
  componentWillMount(){
    //const { id } = this.props.match.params;
    //this.props.fetchPost(id);
    this.props.fetchPosts();
  }

  render() {
    const { post } = this.props;
    return (
      <div className="row" id="postShow">
        {post ?
          (<Post post={post} editable='true'/>)
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

export default withRouter(connect(mapStateToProps, { fetchPost, fetchPosts, deletePost })(PostShow));
