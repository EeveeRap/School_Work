import PropTypes from 'prop-types';
export default function Post(props) {
  const {title, body, author, date} = props.post;

  return (
    <div className="post">
      <h2>{ title }</h2>
      <h3>by { author } on { new Date(date).toLocaleString() }</h3>
      <article>{ body }</article>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired
};
