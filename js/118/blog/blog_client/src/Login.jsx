import PropTypes from 'prop-types';
import useForm from './UseForm';
import { useState } from 'react';

export default function Login({ setUsername, setError }) {
  const [formData, setFormData] = useForm({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState();

  async function login(e) {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} ${response.statusText} - ${msg}`);
      }

      setUsername(formData.username);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  async function register(e) {
    e.preventDefault();

    try {
      if (!formData.username || !formData.password) {
        throw new Error('username and password are required');
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        //credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} ${response.statusText} - ${msg}`);
      }

      setMessage('Registration successfull');
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  return (
    <form onSubmit={login}>
      <input name="username" placeholder="username" value={formData.username} onChange={setFormData} required/>
      <input name="password" placeholder="password" type="password" value={formData.password} onChange={setFormData} required/>
      <button>login</button>
      <button type="button" onClick={register}>register</button>
      <div>{message}</div>
    </form>
  )
}

Login.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};
