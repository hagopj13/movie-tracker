// @flow
import axios from '../axiosInstance';

export const getDiscoverMovies = () => axios.get('/discover/movie');
