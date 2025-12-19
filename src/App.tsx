import logo from './assets/logo.svg';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Navbar from './components/Navbar';

import HomePage from './pages/Home';
import ErrorPage from './pages/Error';

import PostPage from './features/posts/pages/Post';
import AllPosts from './features/posts/pages/AllPosts';

import LoginPage from './features/auth/pages/Login';

import ProtectedRoute from './features/admin/pages/ProtctedRoute';
import AdminPage from './features/admin/pages/Admin';

export default function App() {
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Posts', to: '/posts' },
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar links={navLinks} logoSrc={logo} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'posts',
          element: <AllPosts />,
        },
        {
          path: 'posts/:slug',
          element: <PostPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'admin',
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <AdminPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
