import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions';

class NavbarNewPost extends Component {
  constructor(props){
    super(props)
  }

  handleLogout() {
    console.log("Logging out");
    this.props.logOut(() => {
      this.props.history.push('/login');
    });
  }

  handleSubmit(event){
    event.preventDefault();
  }

  render() {
    return(
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-3">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><strong>TeachMe</strong></Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-3">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/user/posts">My Posts</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={this.handleLogout.bind(this)} className="btn btn-info">Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(null, { logOut })(NavbarNewPost));
