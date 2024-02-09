const BASE_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));
  if (profile) {
    return { Authorization: `Bearer ${profile.token}` };
  }
  return {};
};

export const getUser = (userId) => {
  return fetch(`${BASE_URL}/api/user/${userId}`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

export const updateUser = (id, formData) => {
  return fetch(`${BASE_URL}/user/${id}`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
    },
    body: JSON.stringify(formData),
  }).then(response => response.json());
};

export const getAllUser = () => {
  return fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

export const followUser = (id, data) => {
  return fetch(`${BASE_URL}/user/${id}/follow`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const unfollowUser = (id, data) => {
  return fetch(`${BASE_URL}/user/${id}/unfollow`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
};
