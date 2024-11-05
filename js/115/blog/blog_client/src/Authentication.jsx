import { useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import './Authentication.css';

export default function Authentication() {
  const [username, setUsername] = useState();

  return (
    <div id="authentication">
      {username ? <Logout setUsername={setUsername} username={username}/> : <Login setUsername={setUsername}/>}
    </div>
  )
}
