import PropTypes from 'prop-types';
import Comment from './Comment.jsx';
import './Post.css';
import { useState } from 'react';
import AddComment from './AddComment.jsx';

export default function Post(props) {
  const {post: {_id, title, body, author, date, comments}, setError} = props;
  const [commenting, setCommenting] = useState();

  const content = commenting ? <AddComment id={_id} setCommenting={setCommenting} setError={setError}/> : <button onClick={()=>setCommenting(true)}>add comment</button>

  return (
    <div className="post">
      <h2>{ title }</h2>
      <h3>by { author } on { new Date(date).toLocaleString() }</h3>
      <article>{ body }</article>
      <div className="comments">
        {content}
        {comments?.map(c => (<Comment key={c.date} comment={c}></Comment>))}
      </div>
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
    comments: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }))
  }).isRequired,
  setError: PropTypes.func.isRequired
};
