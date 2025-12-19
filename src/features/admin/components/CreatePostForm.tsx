import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactMarkdown from 'react-markdown';
import Input from '../../../components/Input';
import Textarea from '../../../components/TextArea';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import  fetchHttp  from '../../../utils/CreateQueryFunction';
import type { AppError } from '../../../types';

const postSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  excerpt: z.string().min(10, 'O resumo deve ter pelo menos 10 caracteres'),
  content: z.string().min(10, 'O conteúdo deve ter pelo menos 10 caracteres'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
});

type PostData = z.infer<typeof postSchema>;

export default function PostForm({ className = '' }: { className?: string }) {
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<PostData>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: { status: 'draft', tags: [] },
  });

  const contentValue = watch('content', ''); 

  const onSubmit = async (data: PostData) => {
    setGeneralError('');
    setLoading(true);

    try {
      await fetchHttp<void>({
        path: '/posts',
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      alert('Post criado com sucesso!');
    } catch (err: unknown) {
      const errTyped = err as AppError;

      if (errTyped.statusCode === 401) {
        setGeneralError('Você não tem permissão para criar posts.');
      }
      else {
        setGeneralError('Erro inesperado. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`w-full flex flex-col lg:flex-row gap-6 ${className}`}>
      <div className="flex-1 flex flex-col gap-4">
        {generalError && <p className="text-red-500 text-sm">{generalError}</p>}

        <Input
          label="Título"
          placeholder="Digite o título do post"
          error={errors.title?.message}
          {...register('title')}
        />

        <Textarea
          label="Resumo"
          placeholder="Digite um breve resumo"
          error={errors.excerpt?.message}
          {...register('excerpt')}
        />

        <Textarea
          label="Conteúdo (Markdown)"
          placeholder="Escreva o conteúdo completo em Markdown"
          error={errors.content?.message}
          {...register('content')}
          rows={10}
        />

        <Input
          label="Tags (separadas por vírgula)"
          placeholder="Ex: Tecnologia, React"
          {...register('tags', {
            setValueAs: (v) =>
              typeof v === 'string'
                ? v.split(',').map((t) => t.trim()).filter(Boolean)
                : [],
          })}
        />

        <Select
          label="Status"
          {...register('status')}
          options={[
            { value: 'draft', label: 'Rascunho' },
            { value: 'published', label: 'Publicado' },
          ]}
        />

        <Button disabled={loading || !isValid} variant="primary" htmlType="submit">
          {loading ? 'Salvando...' : 'Criar Post'}
        </Button>
      </div>

      <div className="w-full lg:w-1/2 border rounded bg-gray-50 p-4 overflow-y-auto mt-4 lg:mt-0 prose whitespace-pre-wrap" style={{ maxHeight: '600px' }}>
        <h3 className="mb-4">Preview do Markdown</h3>
        <ReactMarkdown >{contentValue || 'O conteúdo em Markdown aparecerá aqui...'}</ReactMarkdown>
      </div>
    </form>

  );
}
