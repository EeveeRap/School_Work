import PropTypes from 'prop-types';
import './AddComment.css';
import useForm from './UseForm';

export default function AddComment({id, setCommenting, setError}) {
  const [formData, setFormData] = useForm({
    body: ''
  });

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${id}/comments`, {
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

      setCommenting(false);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  return (
    <form onSubmit={submit}>
      <input name="body" required value={formData.body} onChange={setFormData} />
      <button>add</button>
      <button type="button" onClick={() => setCommenting(false)}>cancel</button>
    </form>
  )
}

AddComment.propTypes = {
  id: PropTypes.string.isRequired,
  setCommenting: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};
