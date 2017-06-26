import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions'
class LoggedIn extends Component {

  componentDidMount(){
      this.props.fetchUser();
  }

  render() {
    return(
      <div >
        <div className="page-header">
            <h1>Hello! {this.props.username}</h1>
        </div>


      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { fetchUser })(LoggedIn);
