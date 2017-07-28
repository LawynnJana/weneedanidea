import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PostList extends Component {
  constructor(props){
    super(props);
  }

  propCompare(param){
    return (a, b) => (a.CardInfo[param] < b.CardInfo[param]) ? 1 : ((b.CardInfo[param] < a.CardInfo[param]) ? -1 : 0)
  }

  renderPosts(){
    let posts = _.values(this.props.posts);
    // Sort posts based on selection
    if(this.props.type === 'new'){
     _.sortBy(posts, 'creationTime');
     posts.reverse();
    } else if(this.props.type === 'likes'){
     posts.sort(this.propCompare('Likes'));
    } else if(this.props.type === 'shares'){
     posts.sort(this.propCompare('Shares'));
    }
    return _.map(posts, (post, index) => {
      const { CardInfo } = post;
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const date = new Date(CardInfo.CreationDate);
      const dateStr = `${monthNames[date.getMonth()]} ${date.getDate()}`;
      return <li key={index} className="list-group-item ">
        <Link to={`/user/show/${post.postId}`}><h2 className="text-danger">{CardInfo.Title}</h2></Link><i className="glyphicon glyphicon-heart" aria-hidden="true"></i> {CardInfo.Likes} <i className="glyphicon glyphicon-share-alt" aria-hidden="true"></i> {CardInfo.Shares} <i className="fa fa-clock-o" aria-hidden="true"></i> {dateStr}</li>
    });
  }

  render(){
    return (
      <div>
        { this.props.posts ?
          (<div>
            <ul className="list-group">
              {this.renderPosts()}
            </ul>
          </div>):
          (<div>{console.log("No posts in list:", this.props.posts)}<div>No posts!</div></div>)
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
