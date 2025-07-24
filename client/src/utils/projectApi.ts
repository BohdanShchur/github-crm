
// Handler for extracting JWT token from cookies
const getAccessToken = () => {
  const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : '';
};

// Generic API handler to avoid duplicate logic
const apiHandler = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

export const updateProject = async (projectId: number, updatedData: any) => {
  const token = getAccessToken();
  return apiHandler(`http://localhost:5000/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(updatedData),
  });
};

export const fetchProjects = async () => {
  const token = getAccessToken();
  return apiHandler('http://localhost:5000/projects', {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

export const addProject = async (data: any) => {
  const token = getAccessToken();
  return apiHandler('http://localhost:5000/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
};

export const removeProject = async (projectId: number) => {
  const token = getAccessToken();
  return apiHandler(`http://localhost:5000/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  });
};
