
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Navbar from './components/Navbar';

import HomePage from './pages/Home';
import ErrorPage from './pages/Error';

import PostPage from '@pages/Post';
import AllPosts from '@pages/AllPosts';

import ProtectedRoute from '@pages/ProtctedRoute';
import AdminPage from '@pages/Admin';

export default function App() {
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Posts', to: '/posts' },
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar links={navLinks} />,
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

  return (
      <RouterProvider router={router} />
  )
}
