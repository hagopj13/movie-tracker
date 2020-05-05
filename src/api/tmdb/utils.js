import type { Movie, MovieUserState, Actor, ImagesConfig, Profile, Results } from 'types';

export const convertResponseToActor = (response: any): Actor => ({
  id: response.id,
  name: response.name,
  character: response.character,
  profilePath: response.profile_path,
});

export const convertResponseToMovie = (response: any): Movie => ({
  id: response.id,
  title: response.title,
  releaseDate: response.release_date,
  voteAverage: Math.round((response.vote_average / 2) * 10) / 10,
  voteCount: response.vote_count,
  posterPath: response.poster_path,
  backdropPath: response.backdrop_path,
  tagline: response.tagline,
  overview: response.overview,
  runtime: response.runtime,
  status: response.status,
  genres: response.genres,
  actors: response.credits?.cast?.map(convertResponseToActor),
  reviews: response.reviews?.results,
  recommendations: response.recommendations?.results?.map(convertResponseToMovie),
});

export const convertResponseToMovieUserState = (response: any): MovieUserState => ({
  isFavorite: response?.favorite ?? false,
  isInWatchlist: response?.watchlist ?? false,
  rating: response?.rated ? response.rated.value / 2 : null,
});

const getDesiredSizeFromList = (desiredSize: string, sizesList: string[]): string => {
  if (sizesList.includes(desiredSize)) {
    return desiredSize;
  }
  return sizesList.length > 1 ? sizesList[sizesList.length - 2] : 'original';
};

export const convertResponseToImagesConfig = (response: any): ImagesConfig => ({
  baseImageUrl: response.images.secure_base_url,
  backdropSize: getDesiredSizeFromList('w1280', response.images.backdrop_sizes),
  posterSize: getDesiredSizeFromList('w342', response.images.poster_sizes),
  profileSize: getDesiredSizeFromList('w185', response.images.profile_sizes),
});

export const convertResponseToProfile = (response: any): Profile => ({
  id: response.id,
  name: response.username,
});

export const convertResponseToMovieResults = (response: any): Results<Movie> => ({
  list: response.results.map(convertResponseToMovie),
  pagination: {
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  },
});
