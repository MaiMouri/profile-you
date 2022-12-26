import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Keywords from './components/Keywords';
import Keyword from './components/Keyword';
import Login from './components/Login';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import App from './App';

// Redux

import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import keywordsReducer from './keywordsSlice'
import store from './store/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home /> },
      {
        path: "/auth/keywords",
        element: <Keywords />,
      },
      {
        path: "/keywords/:id",
        element: <Keyword />,
      },
      // {
      //   path: "/admin/movie/0",
      //   element: <EditMovie />,
      // },
      // {
      //   path: "/admin/movie/:id",
      //   element: <EditMovie />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        {/* <RouterProvider router={router} /> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


