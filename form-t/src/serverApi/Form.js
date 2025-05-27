import axios from "axios";


const BASE_URL = "http://localhost:3000/api/forms";

export const createForm =  async (formData)=>{
    const res = await axios.post(`${BASE_URL}/create`, {formData})
    return res;
  }


export const getAllFormsData = async () => {
    const res = await axios.get(`${BASE_URL}/getAll`);
    return res;
  };


export const deleteForm = async(formId)=>{
  const res = await axios.post(`${BASE_URL}/delete`, {formId})
  return res;
}


export const submitForm = async (formId,formData) => {
  const res =  await axios.post(`${BASE_URL}/submit`, {formId, formData });
  return res;
}
