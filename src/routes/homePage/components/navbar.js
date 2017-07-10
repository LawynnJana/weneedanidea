import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions';



class NavBar extends Component {
  constructor(props){
    super(props)
  }

  handleLogout() {
    console.log("Logging out");
    this.props.logOut(() => {
      this.props.history.push('login');
    });
  }

  handleSubmit(event){
    event.preventDefault();
  }
  
  render() {
    return(
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-3">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">WeNeedAnIdea</a>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-3">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/user/posts">My Posts</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={this.handleLogout.bind(this)} className="btn btn-info">Logout</button></li>
              <li>
                <a className="btn btn-default btn-outline btn-circle collapsed"  data-toggle="collapse" href="#nav-collapse3" aria-expanded="false" aria-controls="nav-collapse3">Search</a>
              </li>
            </ul>
            <div className="collapse nav navbar-nav nav-collapse slide-down" id="nav-collapse3">
              <form className="navbar-form navbar-right" role="search" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-danger"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(null, { logOut })(NavBar));
