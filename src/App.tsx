import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { BaseLayout } from '@features/base';
import { HomePage } from '@features/base';
import { ErrorPage } from '@features/base';

import { Post } from '@features/posts';
import { Posts } from '@features/posts';

import { Login } from '@features/auth';

import { AdminPage } from '@features/admin';
import { ProtectedRoutePage } from '@features/admin';

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'posts', element: <Posts /> },
        { path: 'posts/:slug', element: <Post /> },
        { path: '/login', element: <Login /> },
        {
          path: 'admin',
          element: <ProtectedRoutePage />,
          children: [{
            index: true, element: <AdminPage />
          }],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
