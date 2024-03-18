import { useState } from 'react';
import Blog from './Blog'
import BlogList from './BlogList'
import Header from './Header'


export default function App() {
  const [selectedBlog, setSelectedBlog] = useState();
  return (
    <>
      <Header setSelectedBlog={setSelectedBlog} />
      
      {selectedBlog 
      ? <Blog selectedBlog={selectedBlog} />
      : <BlogList setSelectedBlog={setSelectedBlog} />
      }
    </>
  );
}
