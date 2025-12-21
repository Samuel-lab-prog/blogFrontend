import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

type OrderOption = 'newest' | 'oldest';

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTag = searchParams.get('tag') || undefined;
  const initialOrder =
    (searchParams.get('order') as OrderOption) || 'newest';

  const [tag, setTag] = useState<string | undefined>(initialTag);
  const [order, setOrder] = useState<OrderOption>(initialOrder);

  function setTagFilter(newTag?: string) {
    setTag(newTag);

    setSearchParams((prev) => {
      if (newTag) prev.set('tag', newTag);
      else prev.delete('tag');
      return prev;
    });
  }

  function setOrderFilter(value: OrderOption) {
    setOrder(value);

    setSearchParams((prev) => {
      prev.set('order', value);
      return prev;
    });
  }

  return {
    tag,
    order,
    setTag: setTagFilter,
    setOrder: setOrderFilter,
  };
}
