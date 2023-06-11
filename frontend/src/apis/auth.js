import api from './api';

export async function login(email, password) {
  return await api({
    method: 'POST',
    url: '/auths/login',
    data: {email, password},
  });
}

export async function loginByGoogle(tokenId) {
  return await api({
    method: 'POST',
    url: '/auths/loginByGoogle',
    data: {tokenId},
  });
}

export async function loginByFacebook({ accessToken, userID }) {
  return await api({
    method: 'POST',
    url: '/auths/loginByFacebook',
    data: {accessToken, userID},
  });
}

export async function register({ name, email, password }) {
  return await api({
    method: 'POST',
    url: '/auths/register',
    data: {name, email, password},
  });
}

export async function verify(accessToken) {
  return await api({
    method: 'GET',
    url: '/auths/verify',
    headers: {Authorization: `Bearer ${accessToken}`},
  });
}
