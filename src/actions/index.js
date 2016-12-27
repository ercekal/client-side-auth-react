import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      //update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      //save JWT token
      localStorage.setItem('token', response.data.token);
      //redirect the user
      browserHistory.push('/feature');
    })
    .catch(() => {
      dispatch(authError('Bad login info'));
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
