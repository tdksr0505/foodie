import type { TRestaurantData } from '@/type';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getRestaurantList = async () => {
  return await fetch(`${BASE_API_URL}/api/restaurant/`)
    .then((res) => res.json())
    .then((result) => {
      return result.data.restaurant || [];
    });
};

export const doLogin = async (account: string, password: string) => {
  return await fetch(`${BASE_API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ account, password }),
  }).then((res) => res.json());
};

export const addRestaurant = async (submitValue: TRestaurantData) => {
  return await fetch(`${BASE_API_URL}/api/restaurant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submitValue),
  }).then((res) => res.json());
};

export const updateRestaurant = async (id: string, submitValue: TRestaurantData) => {
  return await fetch(`${BASE_API_URL}/api/restaurant/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submitValue),
  }).then((res) => res.json());
};

export const getRestaurantDetail = async (id: string) => {
  return await fetch(`${BASE_API_URL}/api/restaurant/${id}`).then((res) => res.json());
};

export const deleteRestaurant = async (id: string) => {
  return await fetch(`${BASE_API_URL}/api/restaurant/${id}`, { method: 'DELETE' }).then((res) => res.json());
};
