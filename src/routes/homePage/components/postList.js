import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PostList extends Component {
  constructor(props){
    super(props);
  }
  renderPosts(){
    let posts = _.values(this.props.posts);
    if(this.props.type === 'new'){
      _.sortBy(posts, 'time');
      posts.reverse();
    }
    return _.map(posts, post => {
      return <li key={post.id} className="list-group-item"><Link to={`/user/posts/${post.id}`}>{post.title}</Link></li>
    })
  }
  render(){
    return (
      <div>
        {this.props.posts ?
          <div>
            <ul className="list-group">
              {this.renderPosts()}
            </ul>
          </div>
          : <div>{console.log("list:", this.props.posts)}<div>No posts!</div></div>
        }
      </div>
    )
  }

}
const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}
export default connect(mapStateToProps)(PostList);
