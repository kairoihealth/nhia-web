// This file provides an interface for all our api services defined in the services file of each module.
/* eslint-disable */

// import keys from 'config';
import axios from 'axios';
import Auth from './Auth';

// This url is used for demonstation purposes only. Configure the url for your app in a .env file.

const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

Api.interceptors.request.use(
  (config) => {
    // This adds an authorization key to config object if a token exists.
    if (Auth.isAuthenticated() === true) {
      config.headers['Authorization'] = `Bearer ${Auth.getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Api;
