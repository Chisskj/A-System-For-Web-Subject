import api from './api';

export async function getContests(data) {
  return api({
    method: 'GET',
    url: '/contests',
    param: {
      sort: data && data.sort,
      fields: data && data.fields,
    },
  });
}
export async function getContestsJoined(data) {
  return api({
    method: 'GET',
    url: '/contests/joined',
    param: {
      sort: data && data.sort,
      fields: data && data.fields,
    },
  });
}
export async function getContestsByUser(data) {
  return api({
    method: 'GET',
    url: '/contests/createByUser',
    param: {
      sort: data && data.sort,
      fields: data && data.fields,
    },
  });
}

export async function getContest(id) {
  return api({
    method: 'GET',
    url: `/contests/${id}`,
  });
}

export async function createContest(data) {
  return api({
    method: 'POST',
    url: '/contests',
    data,
  });
}

export async function updateContest(id, data) {
  return api({
    method: 'PUT',
    url: `/contests/${id}`,
    data,
  });
}

export async function deleteContest(id) {
  return api({
    method: 'DELETE',
    url: `/contests/${id}`,
  });
}

export async function verifyPassword({ id, password }) {
  return api({
    method: 'POST',
    url: `/contests/${id}/verifyPassword`,
    data: { password },
  });
}

export async function getQuestions({ id, token }) {
  return api({
    method: 'GET',
    headers: {
      'contest-token': token || null,
    },
    url: `/contests/${id}/getAllQuestion`,
  });
}

export async function mark({ doTime, contestId, groupQuestionId, answers }) {
  return api({
    method: 'POST',
    url: `/contests/${contestId}/mark`,
    data: { doTime, groupQuestionId, answers },
  });
}

export async function getResultByContest(id) {
  return api({
    method: 'GET',
    url: `/contests/${id}/results`,
  });
}

export async function getResultByUserInContest(id) {
  return api({
    method: 'GET',
    url: `/contests/${id}/results/user`,
  });
}

export async function checkAccountRole({ contestId, userId }) {
  return api({
    method: 'GET',
    url: `/contests/${contestId}/role/${userId}`,
  });
}
