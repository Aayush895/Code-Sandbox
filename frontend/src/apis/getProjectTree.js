import axiosInstance from '../config/axiosConfig'

export async function getProjectTree({ projectId }) {
  try {
    const response = await axiosInstance.get(`/api/v1/project/${projectId}`)
    return response?.data?.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
