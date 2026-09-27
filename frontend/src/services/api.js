const API_URL = "http://localhost:5000/api";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}
export async function getCurrentUser() {
  const token = localStorage.getItem("solarisToken");

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not load user");
  }

  return data;
}
export async function saveFavorites(favoritePlanets) {
  const token = localStorage.getItem("solarisToken");

  const response = await fetch(`${API_URL}/user/favorites`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      favoritePlanets,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not save favorites");
  }

  return data;
}
export async function saveQuizProgress(percentage) {
  const token = localStorage.getItem("solarisToken");

  const response = await fetch(
    `${API_URL}/user/quiz-progress`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        percentage: percentage,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not save quiz progress"
    );
  }

  return data;
}
