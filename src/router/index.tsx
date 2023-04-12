import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        index: true,
        element: <Login />,
      },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]);
export default router;
