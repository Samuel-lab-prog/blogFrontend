import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/Input';
import Textarea from '../../../components/TextArea';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import usePost from '../../../hooks/usePost';

// Schema de validação com Zod
const postSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  excerpt: z.string().min(5, 'O resumo deve ter pelo menos 5 caracteres'),
  content: z.string().min(10, 'O conteúdo deve ter pelo menos 10 caracteres'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
});

type PostData = z.infer<typeof postSchema>;

export default function PostForm({ className = '' }: { className?: string }) {
  const [generalError, setGeneralError] = useState('');
  const { post, loading, error } = usePost<PostData, void>('/posts', { credentials: true });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: {
      status: 'draft',
      tags: [],
    },
  });

  const onSubmit = async (data: PostData) => {
    setGeneralError('');
    try {
      post(data);

      if (!error) {
        alert('Post criado com sucesso!');
        return;
      }

      if (error.statusCode === 400) {
        setGeneralError('Dados inválidos. Verifique os campos e tente novamente.');
      } else if (error.statusCode === 401) {
        setGeneralError('Você não tem permissão para criar posts.');
      } else {
        setGeneralError('Erro inesperado. Tente novamente mais tarde.');
      }
    } catch {
      setGeneralError('Erro de rede. Tente novamente mais tarde.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full max-w-lg flex flex-col gap-4 ${className}`}
    >
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
        label="Conteúdo"
        placeholder="Escreva o conteúdo completo"
        error={errors.content?.message}
        {...register('content')}
      />

      <Input
        label="Tags (separadas por vírgula)"
        placeholder="Ex: Tecnologia, React"
        {...register('tags', {
          setValueAs: (v) => {
            if (typeof v !== 'string') return []; // garante que não quebre
            return v
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);
          },
        })}
      />


      <Select label="Status" {...register('status')} options={[
        { value: 'draft', label: 'Rascunho' },
        { value: 'published', label: 'Publicado' },
      ]} />

      <Button disabled={loading || !isValid} variant="primary" htmlType="submit">
        {loading ? 'Salvando...' : 'Criar Post'}
      </Button>
    </form>
  );
}
