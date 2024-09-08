import { useEffect, useState } from 'react';
import { Either, fold } from 'fp-ts/lib/Either';
import { Option, none, some } from 'fp-ts/lib/Option';

type AsyncEitherFetcher<E, A> = () => Promise<Either<E, A>>;

export const useAsyncEither = <E, A, T>(
  fetcher: AsyncEitherFetcher<E, A>, 
  handleError: (error: E) => Option<T>,
  handleSuccess: (data: A) => Option<T>
) => {
  const [content, setContent] = useState<Option<T>>(none);

  useEffect(() => {
    const renderContent = async () => {
      const result: Either<E, A> = await fetcher();

      const output = fold<E, A, Option<T>>(
        (error) => handleError(error),
        (data) => handleSuccess(data)
      )(result);

      setContent(output);
    };

    renderContent();
  }, [fetcher, handleError, handleSuccess]);

  return content;
};
