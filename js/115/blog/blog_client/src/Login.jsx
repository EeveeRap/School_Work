import PropTypes from 'prop-types';
import useForm from './UseForm';

export default function Login({ setUsername }) {
  const [formData, setFormData] = useForm({
    username: '',
    password: ''
  });

  async function login(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      setUsername(formData.username);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={login}>
      <input name="username" placeholder="username" value={formData.username} onChange={setFormData}/>
      <input name="password" placeholder="password" type="password" value={formData.password} onChange={setFormData} />
      <button>login</button>
      <button type="button">register</button>
    </form>
  )
}

Login.propTypes = {
  setUsername: PropTypes.func.isRequired
};
