import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./AboutUs.jsx"
import Home from './Home.jsx';
import BuyHome from './BuyHome.jsx';
import SellHome from './SellHome.jsx';
import Index from './Index.jsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Index />
        },
        {
          path:"/Home",
          element: <Home />
        },
        {
          path:"/AboutUs",
          element: <AboutUs />
        },
        {
          path:"/BuyHome",
          element: <BuyHome />
        },
        {
          path:"/SellHome",
          element: <SellHome />
        },

      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < RouterProvider router={router} /> 
  </React.StrictMode>,
)
