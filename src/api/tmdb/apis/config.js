// @flow
import axios from '../axiosInstance';

export const getConfig = () => axios.get('/configuration');

export const getAllGenres = () => axios.get('/genre/movie/list');
