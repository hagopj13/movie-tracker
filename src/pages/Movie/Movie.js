// @flow
import React from 'react';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const { id } = useParams();
  return (
    <div>
      MoviePage for movie with id=
      {id}
    </div>
  );
};

export default MoviePage;
