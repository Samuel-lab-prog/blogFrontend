import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { BaseLayout } from '@features/base';
import { HomePage } from '@features/base';
import { ErrorPage } from '@features/base';

import { PostPage } from '@features/posts';
import { PostsPage } from '@features/posts';

import { LoginPage } from '@features/auth';

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
        { path: 'posts', element: <PostsPage /> },
        { path: 'posts/:slug', element: <PostPage /> },
        { path: '/login', element: <LoginPage /> },
        {
          path: 'admin',
          element: <ProtectedRoutePage />,
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
