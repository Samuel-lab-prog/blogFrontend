import { useState } from 'react';
import Button from '../../../components/Button';
import PostForm from '../components/CreatePostForm';

export default function AdminPage() {
  const [activeForm, setActiveForm] = useState<'create' | 'update' | 'delete' | null>('create');

  return (
    <main className='w-full'>
      <section className='px-4 lg:px-16 flex flex-col justify-center items-center my-8 w-full'>
        <h2 className="mb-6">Admin Dashboard</h2>

        <div className="flex gap-2 mb-8">
          <Button variant="primary" onClick={() => setActiveForm('create')}>
            Criar Post
          </Button>
          <Button variant="primary" onClick={() => setActiveForm('update')}>
            Atualizar Post
          </Button>
          <Button variant="primary" onClick={() => setActiveForm('delete')}>
            Deletar Post
          </Button>
        </div>
        
        {activeForm === 'create' && <PostForm />}
        {activeForm === 'update' && (
          <p>Formulário de atualização em breve...</p>
        )}
        {activeForm === 'delete' && (
          <p>Formulário de deleção em breve...</p>
        )}
      </section>
    </main>
  );
}
