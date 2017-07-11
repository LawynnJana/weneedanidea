import React from 'react';

const PostsShow = () => {
  return(
    <div className="container">
      <div><h2>My Feed</h2></div>
        <ul className="nav nav-tabs">
          <li role="presentation" className="active"><a href="#">Top</a></li>
          <li role="presentation"><a href="#">New</a></li>
          <li role="presentation"><a href="#">Comments</a></li>
        </ul>
    </div>
  );
}

export default PostsShow;
