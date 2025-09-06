import axiosInstance from '../config/axiosConfig'

export async function createProjectApi() {
  try {
    const response = await axiosInstance.post('/api/v1/project')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
