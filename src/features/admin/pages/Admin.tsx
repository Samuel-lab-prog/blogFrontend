import { useState } from 'react';
import Button from '../../../components/Button';
import PostForm from '../components/CreatePostForm';

export default function AdminPage() {
  const [activeForm, setActiveForm] = useState<'create' | 'update' | 'delete' | null>('create');

  return (
    <main className="w-full mb-16">
      <section className="flex flex-col justify-center items-center mt-20 w-full">
        <h2 className="mb-6">Admin Dashboard</h2>

        <div className="flex gap-2 mb-8 justify-center">
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

      </section>
      <section className="px-4 lg:px-16 flex flex-col justify-center items-center my-8 w-full">
        <div className="flex flex-col w-full">
          {activeForm === 'create' &&
            <>
              <h2 className='mb-4'>Criar Post</h2>
              <PostForm />
            </>
          }
          {activeForm === 'update' &&
            <>
              <h2 className='mb-4'>Atualizar Post</h2>
              <p>Formulário de atualização em breve...</p>
            </>
          }
          {activeForm === 'delete' && <>
            <h2 className='mb-4'>Deletar Post</h2>
            <p>Formulário de deleção em breve...</p>
          </>
          }
        </div>
      </section>
    </main>
  );
}
