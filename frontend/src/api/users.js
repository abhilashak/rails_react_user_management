const USERS_URL = "api/users"

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (response.status == 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.errors && data.errors.join(", ") || `Request failed: ${response.status}`
    );
  }

  return data;
}

export const userApi = {
  list: (options) => request(USERS_URL, options),
  
  create: (user) => request(USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({user})
  }),
  
  update: (user, id) => request(`${USERS_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({user})
  }),

  delete: (id) => request(`${USERS_URL}/${id}`, { method: "DELETE" })
};