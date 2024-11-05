import PropTypes from 'prop-types';

export default function Logout({ username, setUsername }) {
  async function logout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        //credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      setUsername();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>Logged in as {username} <button onClick={logout}>logout</button></div>
  )
}

Logout.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired
};
