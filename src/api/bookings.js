import { axi ,authAxios } from "./authAxios";

export const housingsReq = async () => {
  const res = await axi.get("/get_all_housings/");
  return res?.data
}

export const housingReq = async (id) => {
  const res = await authAxios.get(`/get_housing/${id}/`)
  return res?.data
}

export const bookingsReq = async (id) => {
  const res = await authAxios.get(`/booking/${id}/`)
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