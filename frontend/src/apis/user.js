import api from './api';

export async function updateUser(user) {
  return await api({
    method: 'PUT',
    url: '/users',
    data: user,
  });
}

export async function changePassword(data) {
  return await api({
    method: 'PUT',
    url: '/users/changePassword',
    data,
  });
}
