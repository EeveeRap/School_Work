import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Authentication from './Authentication';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import AddPost from './AddPost.jsx';
import Posts/*, { loader as postsLoader }*/ from './Posts.jsx';
import Error from './Error.jsx';
import { useState } from 'react';

function App() {
  const [error, setError] = useState();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Header />
        <Authentication setError={setError} />
        {error && <Error error={error} setError={setError} />}
        <Outlet />
      </>,
      children: [
        {
          index: true,
          // loader: postsLoader,
          // errorElement: <Error />,
          element: <Posts setError={setError} />
        },
        {
          path: '/addPost',
          element: <AddPost setError={setError} />
        },
      ]
    },
    {
      path: '*',
      element: <Navigate to="/" replace={true} />
    }
  ]);

  return (<RouterProvider router={router} />);
}

export default App
