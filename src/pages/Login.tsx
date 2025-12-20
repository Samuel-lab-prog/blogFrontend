import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <main className="h-140 flex flex-col justify-center">
      <section className="px-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 gap-2 text-center">
          <h2>Entrar</h2>
          <p>Por favor, insira suas credenciais para entrar.</p>
        </div>
        <LoginForm className="mb-6" />
      </section>
    </main>
  );
}
