import React from 'react';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <div>
      <h1>Bitch, you want to log in?</h1>
      <Link className="btn btn-primary" to="/login">Login</Link>
      <Link className="btn btn-info" to="/register">Register</Link>
    </div>
  );
}

export default NotLoggedIn;
