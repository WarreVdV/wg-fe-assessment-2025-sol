import { User } from "./user.type";

const url = import.meta.env.VITE_USER_API;

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${url}/users`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const getUsersById = async (id: String): Promise<User> => {
  const response = await fetch(`${url}/users/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user with id ${id}`);
  }
  return response.json();
};
export const createUser = async (user: User): Promise<User> => {
  const response = await fetch(`${url}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
};
export const updateUser = async (id: String, user: User): Promise<User> => {
  const response = await fetch(`${url}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user with id ${id}`);
  }
  return response.json();
};
export const deleteUser = async (id: String): Promise<User> => {
  const response = await fetch(`${url}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user with id ${id}`);
  }
  return response.json();
};
