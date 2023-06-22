import api from './api';

export async function updateUser(user) {
  return api({
    method: 'PUT',
    url: '/users',
    data: user,
  });
}

export async function changePassword(data) {
  return api({
    method: 'PUT',
    url: '/users/changePassword',
    data,
  });
}
