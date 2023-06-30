import api from './api';

export async function getGroupQuestions(key) {
  return api({
    method: 'GET',
    url: '/groupQuestions',
    params: { key },
  });
}

export async function createGroupQuestion(data) {
  return api({
    method: 'POST',
    url: '/groupQuestions',
    data,
  });
}

export async function updateGroupQuestions(id, data) {
  return api({
    method: 'PUT',
    url: `/groupQuestions/${id}`,
    data,
  });
}

export async function deleteGroupQuestions(id) {
  return api({
    method: 'DELETE',
    url: `/groupQuestions/${id}`,
  });
}
