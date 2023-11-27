import { axi, authAxios } from "./authAxios";

export const registerReq = async (username, email, password, confirm_password) => {
  return await axi.post("/users/register/", {username, email, password, confirm_password});
}

export const loginReq = async (username, password) => {
  const res = await axi.post('/users/login/', {username, password})
  return res
}

export const getMeReq = async (id) => {
  const res = await authAxios.get(`/users/${id}/`)
  return res?.data
}

export const updateUserReq = async (id, data) => {
  const formData = new FormData();
  formData.append("first_name", data.first_name)
  formData.append("last_name", data.last_name)
  formData.append("username", data.username)
  formData.append("email", data.email)
  formData.append("birthday", data.birthday)
  if (data?.image) {
    formData.append("photo", data.image)
  }
  const res = await authAxios.patch(`/users/${id}/`, formData)
  return res
}

export const changePasswordReq = async (id, password) => {
  const res = await authAxios.post(`/change_password/${id}/`, {password})
  return res
}

export const deleteUserReq = async (id) => {
  const res = await authAxios.delete(`/users/${id}/`)
  return res
}