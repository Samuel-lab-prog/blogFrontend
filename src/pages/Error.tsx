import { NavigationLink } from '../components/NavigationLink/component';

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
        <p className="text-lg text-gray-600 mt-3">
          Something went wrong — or this page doesn’t exist.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Try returning to the homepage or checking the URL.
        </p>
        <NavigationLink
          to="/"
        >
          Go back home
        </NavigationLink>
      </div>
    </main>
  );
}
