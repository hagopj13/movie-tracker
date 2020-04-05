// @flow
import axios from '../axiosInstance';

export const getConfig = () => axios.get('/configuration');
