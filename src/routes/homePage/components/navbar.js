import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){

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
              <li><Link to="/user/posts">Show Posts</Link></li>
              <li><Link to="/user/profile">Profile</Link></li>
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

export default NavBar;
