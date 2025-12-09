const API_URL = 'http://localhost:3001/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
  };

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export const authApi = {
  register(email, password) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout() {
    return request('/auth/logout', {
      method: 'POST',
    });
  },
};

export const taskApi = {
  getAll() {
    return request('/tasks');
  },

  create(title) {
    return request('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
  },

  update(id, updates) {
    return request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete(id) {
    return request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
