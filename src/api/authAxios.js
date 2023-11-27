import axios from "axios";
import { useAuthStore } from "../store/auth";
import { jwtDecode } from 'jwt-decode'

function logout() {
  useAuthStore.getState().logout()
}

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const axi = axios.create({
  baseURL
});

export const authAxios = axios.create({
  baseURL,
  withCredentials: true
});

authAxios.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().access;
  config.headers = {
    Authorization: `Bearer ${token}`
  };
  
  const tokenDecoded = jwtDecode(token)

  const expiration = new Date(tokenDecoded.exp * 1000)
  const now = new Date()
  const fivMin = 1000 * 60 * 5

  if (expiration.getTime() - now.getTime() < fivMin)
    try {
      const response = await axi.post("/refresh/", { refresh: useAuthStore.getState().refresh })
      useAuthStore.getState().setToken(response.data.access, response.data.refresh)
    } catch (err) {
      logout()
    }
    return config
  
});