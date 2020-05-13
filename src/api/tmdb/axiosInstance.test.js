import axiosInstance from './axiosInstance';

describe('TMDb axios instance', () => {
  describe('request interceptors', () => {
    it('should add the api key to the current request params', () => {
      const currentParams = { param: 'value' };
      expect(
        axiosInstance.interceptors.request.handlers[0].fulfilled({ params: currentParams }).params,
      ).toEqual({
        ...currentParams,
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      });
    });

    it('should create params and the api key if there are no current params', () => {
      expect(axiosInstance.interceptors.request.handlers[0].fulfilled({}).params).toEqual({
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      });
    });
  });

  describe('response interceptors', () => {
    it('should return a Promise that rejects error.response.data if an error occurs', () => {
      const data = { status_message: 'error message' };
      expect(
        axiosInstance.interceptors.response.handlers[0].rejected({ response: { data } }),
      ).rejects.toMatchObject(data);
    });
  });
});
