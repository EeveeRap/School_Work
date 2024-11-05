import { useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import './Authentication.css';
import PropTypes from 'prop-types';

export default function Authentication({ setError }) {
  const [username, setUsername] = useState();

  return (
    <div id="authentication">
      {username ? <Logout setUsername={setUsername} username={username} /> : <Login setUsername={setUsername} setError={setError} />}
    </div>
  )
}

Authentication.propTypes = {
  setError: PropTypes.func.isRequired
};
