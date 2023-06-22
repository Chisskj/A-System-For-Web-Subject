import api from './api';

export async function getGroupQuestions(key) {
  return await api({
    method: 'GET',
    url: '/groupQuestions',
    params: { key },
  });
}

export async function createGroupQuestion(data) {
  return await api({
    method: 'POST',
    url: '/groupQuestions',
    data,
  });
}

export async function updateGroupQuestions(id, data) {
  return await api({
    method: 'PUT',
    url: `/groupQuestions/${id}`,
    data,
  });
}

export async function deleteGroupQuestions(id) {
  return await api({
    method: 'DELETE',
    url: `/groupQuestions/${id}`,
  });
}
