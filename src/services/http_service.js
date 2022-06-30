import axios from 'axios';
import { name } from '../../package.json';

// const BASE_URL = '';
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
const PERSIST_STATE_KEY = `PERSIST_STATE_${name}`;

let accessToken;
let siteId;

export const getAccessToken = () => accessToken;
export const getSiteId = () => siteId;

export const checkAccessToken = () => {
  const data = JSON.parse(localStorage.getItem(PERSIST_STATE_KEY));

  accessToken = data?.token;
  siteId = data?.siteId;

  return data;
};

export const setAccessToken = (token) => {
  accessToken = token;
  localStorage.setItem(PERSIST_STATE_KEY, JSON.stringify({ token, siteId }));
};

export const setSiteId = (site) => {
  siteId = site;
  localStorage.setItem(
    PERSIST_STATE_KEY,
    JSON.stringify({ token: accessToken, siteId }),
  );
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem(PERSIST_STATE_KEY);
};

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.site_id = siteId || 0;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if (response.config.returnHeaders) {
      return { data: response.data, headers: response.headers };
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
      window.location = '/login';
      return null;
    }

    return Promise.reject(
      error.response?.data || { message: 'Network error!' },
    );
  },
);

export const getImageUri = (image) => {
  if (image?.length && image.startsWith('data:image')) {
    return image;
  }

  return image?.length ? `${BASE_URL}/static/${image}` : null;
};

export const downloadBlob = async (url, params, headers) => {
  try {
    // Create request
    const response = await api.get(url, {
      params,
      responseType: 'blob',
      headers,
      returnHeaders: true,
    });

    const attachmentHeader = response.headers['content-disposition'];
    const filename = attachmentHeader.split('filename=')[1] || 'download';

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    // Download file
    link.click();
    setTimeout(() => link.remove(), 1000);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export default api;
