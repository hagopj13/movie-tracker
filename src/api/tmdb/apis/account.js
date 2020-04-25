// @flow
import axios from '../axiosInstance';

export const getAccountDetails = (sessionId: string) =>
  axios.get(`/account?session_id=${sessionId}`);
