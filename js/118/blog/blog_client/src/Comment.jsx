import './Comment.css';
import PropTypes from 'prop-types';

export default function Comment(props) {
  const { author, date, body } = props.comment;
  return (
    <div className="comment">
      <h2>{body}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()}</h3>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired
};
