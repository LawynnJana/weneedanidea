import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  updateLikes,
  updateShares
} from '../actions'

class Post extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('Obj', this.props.post);
  }
  handleShare(){

  }

  handleLike(){
    const { post } = this.props;
    //if()
    //this.props.updateLikes(post.postId, post.category, post.subcategory);
  }

  render(){
    const { post } = this.props;
    return (
      <div className="col-xs-12 col-sm-12 col-md-8 col-md-offset-2 col-lg-8">
        <div className="page-header">
          <h1>{post.CardInfo.Title}</h1>
        </div>
        <div className="img-main">
          {post.CardInfo.ImgSrc && <img src={post.CardInfo.ImgSrc}/>}
        </div>
        <div>
          <p className="">{post.Body}</p>
        </div>
        <div className="footer">
          { this.props.editable && <span style={{cursor: 'pointer'}} onClick={this.props.onDelete}><i className="fa fa-trash-o fa-2x" aria-hidden="true"></i></span>}
          <span style={{cursor: 'pointer'}} onClick={this.handleLike.bind(this)}><i className="fa fa-heart-o fa-2x" aria-hidden="true"></i></span>
          <span style={{cursor: 'pointer'}} onClick={this.handleShare.bind(this)}><i className="fa fa-share fa-2x" aria-hidden="true"></i></span>
        </div>
      </div>
    );
  }
}


export default connect(null, { updateLikes, updateShares })(Post);
