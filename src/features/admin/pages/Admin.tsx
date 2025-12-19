import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '../../../components/Button';
import PostForm from '../components/CreatePostForm';
import fetchHttp  from '../../../utils/CreateQueryFunction';
import AsyncState from '../../../utils/AsyncState';

type DraftPost = {
  id: string;
  title: string;
};

export default function AdminPage() {
  const [activeForm, setActiveForm] = useState<'create' | 'update' | 'delete' | null>('create');

  const { data: drafts = [], isLoading, isError } = useQuery({
    queryKey: ['drafts'],
    queryFn: () => fetchHttp<DraftPost[]>({ path: '/posts/drafts', credentials: 'include' }),
  });

  return (
    <main className="w-full">
      <section className="px-4 lg:px-16 flex flex-col justify-center items-center my-8 w-full">
        <h2 className="mb-6">Admin Dashboard</h2>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
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
        <div className="flex-1">
          {activeForm === 'create' && <PostForm />}
          {activeForm === 'update' && <p>Formulário de atualização em breve...</p>}
          {activeForm === 'delete' && <p>Formulário de deleção em breve...</p>}
          <div
            className="w-full lg:w-1/3 border rounded bg-gray-50 p-4 overflow-y-auto"
            style={{ maxHeight: '600px' }}
          >
          </div>
        </div>
        <section>
          <h3 className="mb-2 font-bold text-lg">Posts em Rascunho</h3>
          <AsyncState isLoading={isLoading} isError={isError} isEmpty={!isLoading && drafts.length === 0}>
            <ul className="">
              {drafts.map((draft) => (
                <li key={draft.id}>{draft.title}</li>
              ))}
            </ul>
          </AsyncState>
        </section>
      </section>
    </main>
  );
}
