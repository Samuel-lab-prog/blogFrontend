import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactMarkdown from 'react-markdown';

import Input from '../../../components/Input';
import Textarea from '../../../components/TextArea';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import fetchHttp from '../../../utils/CreateQueryFunction';

import type { AppError } from '../../../types';

const postSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres'),
  excerpt: z
    .string()
    .min(10, 'O resumo deve ter pelo menos 10 caracteres'),
  content: z
    .string()
    .min(10, 'O conteúdo deve ter pelo menos 10 caracteres'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
});

type PostData = z.infer<typeof postSchema>;

export default function PostForm({
  className = '',
}: {
  className?: string;
}) {
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScrollRef = useRef(true);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      status: 'draft',
      tags: [],
    },
  });

  const { mutateAsync: createPost } = useMutation({
    mutationFn: (newPost: PostData) =>
      fetchHttp<{ id: number }>({
        path: '/posts',
        method: 'POST',
        credentials: 'include',
        body: newPost,
      }),
  });

  const contentValue = watch('content', '');
  const statusValue = watch('status', 'draft');

  const scrollPreviewToBottom = () => {
    if (!shouldAutoScrollRef.current) return;
    const preview = previewRef.current;
    if (!preview) return;
    preview.scrollTop = preview.scrollHeight;
  };

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const onScroll = () => {
      const isAtBottom =
        preview.scrollTop + preview.clientHeight >=
        preview.scrollHeight - 4;
      shouldAutoScrollRef.current = isAtBottom;
    };

    preview.addEventListener('scroll', onScroll);
    return () => preview.removeEventListener('scroll', onScroll);
  }, []);

  const onSubmit = async (data: PostData) => {
    setGeneralError('');
    setLoading(true);

    try {
      await createPost(data);
      alert('Post criado com sucesso!');
    } catch (err: unknown) {
      const errorResponse = err as AppError;

      const status = errorResponse?.statusCode;
      const message = errorResponse?.errorMessages?.join(' ');

      if (status === 401) {
        setGeneralError('Você não tem permissão para criar posts.');
      } else if (status === 409 && message?.includes('slug')) {
        setError('title', {
          type: 'manual',
          message: 'Já existe um post com esse título.',
        });
      } else if (status === 422) {
        setGeneralError(
          'Dados inválidos. Verifique os campos e tente novamente.'
        );
      } else {
        setGeneralError(
          message || 'Erro ao criar post. Tente novamente mais tarde.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full flex flex-col gap-6 ${className}`}
    >
      {generalError && (
        <p className="text-red-500 text-sm">{generalError}</p>
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {(() => {
          // We need to assign two things from register, so we use a IIFE
          const { ref, onChange, ...rest } = register('content');
          return (
            <Textarea
              label="Conteúdo (Markdown)"
              placeholder="Escreva o conteúdo completo em Markdown"
              error={errors.content?.message}
              rows={10}
              {...rest}
              ref={(el) => {
                ref(el);
                contentRef.current = el;
              }}
              onChange={(e) => {
                onChange(e); // react-hook-form
                shouldAutoScrollRef.current = true; // reativa auto-scroll
                scrollPreviewToBottom();
              }}
            />
          );
        })()}

        <div
          ref={previewRef}
          className="h-80 wrap-break-word w-full border rounded bg-gray-50 p-4 overflow-y-auto overflow-x-hidden prose whitespace-pre-wrap"
        >
          <ReactMarkdown>
            {contentValue ||
              'O preview em Markdown aparecerá aqui...'}
          </ReactMarkdown>
        </div>
      </div>

      <Input
        label="Tags (separadas por vírgula)"
        placeholder="Ex: Tecnologia, React"
        {...register('tags', {
          setValueAs: (v) =>
            typeof v === 'string'
              ? v
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              : [],
        })}
      />

      <Select
        hint={
          statusValue === 'draft'
            ? 'Posts salvos como rascunho não serão visíveis ao público'
            : undefined
        }
        hintClassName="text-red-500 text-xs md:text-sm"
        label="Status"
        {...register('status')}
        options={[
          { value: 'draft', label: 'Rascunho' },
          { value: 'published', label: 'Publicado' },
        ]}
      />
      <Button
        disabled={loading || !isValid}
        variant="primary"
        htmlType="submit"
      >
        {loading ? 'Salvando...' : 'Criar Post'}
      </Button>
    </form>
  );
}
