/* eslint-disable react/prop-types */
import "./Post.css";

export default function Post(props) {
  const { title, body } = props.post;

  return (
    <div className="post">
      <div className="title">{title}</div>
      <div className="body">{body}</div>
    </div>
  );
}
