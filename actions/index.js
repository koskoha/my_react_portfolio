import axios from 'axios';
import cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000
})

const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, 'jwt') : cookies.getJSON('jwt');
  console.log('token', token);
  if (token) {
    return { headers: { 'authorization': `Bearer ${token}` } }
  }
  return undefined;
}

const rejectPromise = (resError) => {
  console.error(resError)
  let error = {};
  if(resError && resError.response && resError.response.data) {
    error = resError.response.data;
  }else{
    error = resError;
  }
  return Promise.reject(error);
}

export const getSecretData = async (req) => {
  const url = 'http://localhost:3000/api/secret';
  return await axios.get(url, setAuthHeader(req)).then(res => res.data);
}

export const getPortfolios = async () => {
  return await axiosInstance.get('/portfolios').then(res => (res.data));
}

export const getPortfolioById = async (id) => {
  return await axiosInstance.get(`/portfolios/${id}`).then(res => (res.data));
}

export const createPortfolio = async (portfolio) => {
  return await axiosInstance.post('/portfolios', portfolio, setAuthHeader())
    .then(res => (res.data))
    .catch(error => rejectPromise(error))
}

export const updatePortfolio = async (portfolio) => {
  return await axiosInstance.patch(`/portfolios/${portfolio._id}`, portfolio, setAuthHeader())
    .then(res => (res.data))
    .catch(error => rejectPromise(error))
}

export const deletePortfolio = (portfolioId) => {
  return axiosInstance.delete(`/portfolios/${portfolioId}`, setAuthHeader())
    .then(res => (res.data))
    .catch(error => rejectPromise(error))
}
