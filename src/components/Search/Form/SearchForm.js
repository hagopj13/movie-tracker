// @flow
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import SearchField from 'components/Search/Field/SearchField';

type Props = {
  selectedQuery: string,
  onSubmit: ({ query: string }) => void,
};

const schema = yup.object().shape({
  query: yup.string().min(1).required(),
});

const SearchForm = (props: Props) => {
  const { selectedQuery, onSubmit } = props;

  const { register, handleSubmit, setValue } = useForm({
    mode: 'onSubmit',
    validationSchema: schema,
  });

  useEffect(() => {
    if (selectedQuery) {
      setValue('query', selectedQuery);
    }
  }, [selectedQuery, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchField name="query" inputRef={register} />
    </form>
  );
};

export default SearchForm;
