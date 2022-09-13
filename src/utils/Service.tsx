import axios from 'axios';
import Config from 'react-native-config';
import {showToast} from 'utils';

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: 60000,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

export const post = async (
  url: string,
  data: any,
  token?: string,
  headers: any = {},
) => {
  try {
    let finalHeaders = {
      ...headers,
    };

    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await instance({
      method: 'POST',
      url: url,
      data,
      headers: finalHeaders,
    });
    if (response?.data?.status) {
      return response?.data;
    } else {
      showToast(response?.data?.message);
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 413) {
        throw new Error('Ukuran foto terlalu besar!');
      } else if (err.response?.status === 404) {
        throw new Error('Terjadi kesalahan!');
      } else {
        throw err;
      }
    } else {
      throw err;
    }
  }
};

export const get = async (
  url: string,
  token?: string,
  params?: any,
  headers: any = {},
) => {
  try {
    let finalHeaders = {
      ...headers,
    };

    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await instance({
      method: 'GET',
      url: url,
      params,
      headers: finalHeaders,
    });
    // HANDLE RESPONSE GOOGLE AUTO COMPLETE LOCATION
    return response?.data;
  } catch (err) {
    // Handle Error Here
    throw err;
  }
};
