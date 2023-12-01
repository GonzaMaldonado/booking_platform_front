import { authAxios } from "./authAxios";


export const bookingsReq = async (id) => {
  const res = await authAxios.get(`/booking/${id}/`)
  return res?.data
}
