import { useState, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, Transition } from '@headlessui/react';
import { Button } from '@chakra-ui/react';
import fetchHttp from '@utils/CreateQueryFunction';
import type { AppError, PostMinimalData } from '@types';

type DeleteFormData = {
  postId: string;
};

export default function DeletePostForm({ className = '' }: { className?: string }) {
  const [generalError, setGeneralError] = useState('');
  const [query, setQuery] = useState('');
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<DeleteFormData>({
    defaultValues: { postId: '' },
  });

  const { data: posts, isLoading } = useQuery<PostMinimalData[]>({
    queryKey: ['postsMinimal'],
    queryFn: async () =>
      fetchHttp<PostMinimalData[]>({ path: '/posts/minimal', method: 'GET', credentials: 'include' }),
  });

  const filteredPosts = query === ''
    ? posts || []
    : (posts || []).filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  const { mutateAsync: deletePost, isPending: deleting } = useMutation({
    mutationFn: async (postId: string) =>
      fetchHttp<void>({ path: `/posts/${postId}`, method: 'DELETE', credentials: 'include' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postsMinimal'] });
      reset();
      setQuery('');
      alert('Post deletado com sucesso!');
    },
    onError: (err: unknown) => {
      const error = err as AppError;
      if (error?.statusCode === 401) setGeneralError('Você não tem permissão para deletar posts.');
      else if (error?.statusCode === 404) setGeneralError('Post não encontrado.');
      else setGeneralError('Erro ao deletar post. Tente novamente mais tarde.');
    },
  });

  const onSubmit = async (data: DeleteFormData) => {
    setGeneralError('');
    if (!data.postId) return setGeneralError('Selecione um post para deletar.');
    await deletePost(data.postId);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`w-full flex flex-col gap-6 ${className}`}>
      {generalError && <p className="text-red-500 text-sm">{generalError}</p>}

      <Controller
        name="postId"
        control={control}
        rules={{ required: 'Você deve selecionar um post' }}
        render={({ field }) => (
          <Combobox value={field.value} onChange={field.onChange}>
            <div className="relative">
              <ComboboxInput
                className="input w-full"
                placeholder={isLoading ? 'Carregando posts...' : 'Digite para buscar...'}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg z-10">
                  {filteredPosts.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">Nenhum post encontrado</div>
                  ) : (
                    filteredPosts.map((post) => (
                      <ComboboxOption
                        key={post.id}
                        value={post.id.toString()}
                        className={({ active }) =>
                          `cursor-pointer select-none p-2 ${active ? 'bg-blue-500 text-white' : 'text-gray-900'}`
                        }
                      >
                        {post.title}
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </Transition>
            </div>
          </Combobox>
        )}
      />

      <Button disabled={deleting} variant="ghost">
        {deleting ? 'Deletando...' : 'Deletar Post'}
      </Button>
    </form>
  );
}
