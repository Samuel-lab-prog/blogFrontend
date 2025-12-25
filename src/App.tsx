import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Navbar } from '@features/base';
import { HomePage } from '@features/base';
import { ErrorPage } from '@features/base';

import { PostPage } from '@features/posts';
import { PostsPage } from '@features/posts';

import { LoginPage } from '@features/auth';

import { AdminPage } from '@features/admin';
import { ProtectedRoutePage } from '@features/admin';

const navLinks = [
	{ to: '/', label: 'Home' },
	{ to: '/posts', label: 'Posts' },
];

export default function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Navbar links={navLinks} />,
			errorElement: <ErrorPage />,
			children: [
				{ index: true, element: <HomePage /> },
				{ path: 'posts', element: <PostsPage /> },
				{ path: 'posts/:slug/:id', element: <PostPage /> },
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
