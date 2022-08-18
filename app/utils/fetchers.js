import queryString from 'qs';

import { BACKEND_API_URL } from './constants';

export function fullUrl(path, params) {
  return `${BACKEND_API_URL}${path}${stringifyParams(params)}`;
}

export function stringifyParams(params) {
  return params ? `?${queryString.stringify(params)}` : '';
}

/* eslint-disable default-case */
function apiFetch(method, config) {
  fetch(fullUrl(config.path, config.params), {
    method,
    body: JSON.stringify(config.body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(result => result.json())
    .then(result => {
      if (typeof config.afterSuccess === 'function') {
        config.afterSuccess(result);
      }
    });
}

export function apiGet(config) {
  apiFetch('GET', config);
}

export function apiDelete(config) {
  apiFetch('DELETE', config);
}

export function apiPost(config) {
  apiFetch('POST', config);
}
