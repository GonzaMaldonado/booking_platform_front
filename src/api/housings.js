import { axi ,authAxios } from "./authAxios";

export const allHousingsReq = async () => {
  const res = await axi.get("/get_all_housings/");
  return res?.data
}

export const housingReq = async (id) => {
  const res = await authAxios.get(`/get_housing/${id}/`)
  return res?.data
}

export const myHousingsReq = async () => {
  const res = await authAxios.get(`/housing/`)
  return res?.data
}

export const myHousingReq = async (id) => {
  const res = await authAxios.get(`/housing/${id}/`)
  return res?.data
}

export const createHousingReq = async (data) => {
  let formData = new FormData();
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append('description', data.description);
  formData.append('services', data.services);
  formData.append('capacity', data.capacity);
  formData.append('pets', data.pets);
  formData.append('price_day', data.price_day);

  for(let i = 0; i < data.images.length; i++){
    formData.append(`image_${i+1}`, data.images[i])
  }
  /* if (data?.image_5) {
    formData.append("image_5", data.image_5)
  } */
  const res = await authAxios.post('/housing/', formData, {
    headers: {
    'Content-Type': 'multipart/form-data',
    }
  })
  console.log(res)
  return res?.data
}


export const updateHousingReq = async (id, data) => {
  let formData = new FormData();
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append('description', data.description);
  formData.append('services', data.services);
  formData.append('capacity', data.capacity);
  formData.append('pets', data.pets);
  formData.append('price_day', data.price_day);

  for(let i = 0; i < data.images.length; i++){
    formData.append(`image_${i+1}`, data.images[i])
  }
  /* if (data?.image_2) {
    formData.append("image_2", data.image_2)
  } */
  const res = await authAxios.patch(`/housing/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(res)
  return res?.data
}
    

export const deleteHousingReq = async (id) => {
  const res = await authAxios.delete(`/housing/${id}/`)
  return res?.data
}