import './AddPost.css';
import { useNavigate } from 'react-router-dom';
import useForm from './UseForm';
import PropTypes from 'prop-types';

export default function AddPost({setError}) {
  let navigate = useNavigate();
  const [formData, setFormData] = useForm({
    title: '',
    body: ''
  });

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/posts', {
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

      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  return (
    <form id="addPost" onSubmit={onSubmit}>
      <label>
        Title:
        <input name="title" required value={formData.title} onChange={setFormData} />
      </label>
      <label>
        Body:
        <textarea name="body" required value={formData.body} onChange={setFormData}></textarea>
      </label>
      <button>add post</button>
    </form>
  )
}

AddPost.propTypes = {
  setError: PropTypes.func.isRequired
};
