// @flow
import axios from '../axiosInstance';

export const getRequestToken = () => axios.get('/authentication/token/new');

type PostLoginBody = {
  username: string,
  password: string,
  requestToken: string,
};
export const login = ({ username, password, requestToken }: PostLoginBody) =>
  axios.post('/authentication/token/validate_with_login', {
    username,
    password,
    request_token: requestToken,
  });

type CreateSessionBody = {
  requestToken: string,
};
export const createSession = ({ requestToken }: CreateSessionBody) =>
  axios.post('/authentication/session/new', { request_token: requestToken });

type DeleteSessionBody = {
  sessionId: string,
};
export const deleteSession = ({ sessionId }: DeleteSessionBody) =>
  axios.delete('/authentication/session', { data: { session_id: sessionId } });
