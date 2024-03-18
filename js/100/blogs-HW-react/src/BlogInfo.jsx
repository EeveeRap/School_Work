import "./BlogInfo.css";

export default function BlogInfo(props) {
  const { blog: { id, name, website, company: { name: companyName, catchPhrase } }, setSelectedBlog } = props;

  return (
    <div className="blog" onClick={() => setSelectedBlog(id)}>
      <div className="title">{name}</div>
      <div className="website">{website}</div>
      <div className="company">
        <div>{companyName}</div>
        <div>{catchPhrase}</div>
      </div>
    </div>
  );
}
