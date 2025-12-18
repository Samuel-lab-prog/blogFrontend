import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const raw = localStorage.getItem('user');
  const user = raw ? JSON.parse(raw) : null;
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }

  return (
    <>
      {user ? (
        <Outlet />
      ) : (
        <section className="flex flex-col items-center justify-center min-h-screen px-4">
          <h2 className="mb-4 text-2xl font-semibold">Boa tentativa!</h2>
        </section>
      )}
    </>
  );
}
