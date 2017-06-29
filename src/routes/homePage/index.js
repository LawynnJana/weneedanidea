import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoggedIn from './components/loggedIn';
import { firebaseApp } from '../../firebase';
import { fetchUser } from './actions'
import _ from 'lodash';
import { Link } from 'react-router-dom';

import PostsShow from './components/postsShow';
import PostsNew from './components/postsNew';
class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged( user => {
      if (user) {
        if(!user.emailVerified){
          this.props.history.push('verification');
        }
        else {
          //console.log('fetching user...', user);
          this.props.fetchUser(user.uid);
        }
      } else {
        this.props.history.push('login');
      }
    });
  }

  handleSubmit(event){
    event.preventDefault();
  }
  render() {
    //component doesnt rerender
    console.log('app:', this.props.currentUser);

    if(_.isEmpty(this.props.currentUser)){
      return (<div>Loading...</div>);
    }
    return (
      <div>
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
               <li><a href="#">Home</a></li>
               <li><a href="#">Posts</a></li>
               <li><a href="#">My Posts</a></li>
               <li><a href="#">Profile</a></li>
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
        <LoggedIn user={this.props.currentUser}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { fetchUser })(Home);
