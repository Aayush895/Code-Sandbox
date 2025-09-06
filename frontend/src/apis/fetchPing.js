import axiosInstance from '../config/axiosConfig'

export async function fetchPing() {
  try {
    const response = await axiosInstance.get(`/api/v1/ping`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
