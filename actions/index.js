import axios from 'axios';
import cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  timeout: 10000
})

const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, 'jwt') : cookies.getJSON('jwt');
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

// ------------ BLOG ACTIONS --------------

export const getBlogs = async (req) => {
  return await axiosInstance.get('/blogs').then(response => response.data);
}

export const getBlogBySlug = async (slug) => {
  return await axiosInstance.get(`/blogs/s/${slug}`).then(response => response.data);
}

export const getUserBlogs = async (req) => {
  return await axiosInstance.get('/blogs/me', setAuthHeader(req)).then(response => response.data);
}

export const createBlog = (blogData, lockId) => {
  return axiosInstance.post(`/blogs?lockId=${lockId}`, blogData, setAuthHeader())
          .then(response => response.data)
          .catch(err => rejectPromise(err))
}

export const updateBlog = (blogData, blogId) => {
  return axiosInstance.patch(`/blogs/${blogId}`, blogData, setAuthHeader())
          .then(response => response.data)
          .catch(err => rejectPromise(err))
}

export const getBlogById = (blogId) => {
  return axiosInstance.get(`/blogs/${blogId}`).then(response => response.data);
}

export const deleteBlog = (blogId) => {
  return axiosInstance.delete(`/blogs/${blogId}`, setAuthHeader())
          .then(response => response.data)
          .catch(err => rejectPromise(err));
}

