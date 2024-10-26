import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import Login from './routes/login';
import Register from './routes/register';
import CreateTask from './routes/createTask';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './auth/auth';
import ListAllTasks from './routes/listAllTasks';
import MyTasks from './routes/myTasks';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    //The children here appear in the <Outlet> tag in the root page when their links are clicked
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "createTask",
        element: <CreateTask />
      },
      {
        path: "listAllTasks",
        element: <ListAllTasks />
      },
      {
        path: "myTasks",
        element: <MyTasks />
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*This tutorial is very useful for understanding how the react router works https://reactrouter.com/en/main/start/tutorial */
