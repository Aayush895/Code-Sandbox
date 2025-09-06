import { useMutation } from '@tanstack/react-query'
import { createProjectApi } from '../../apis/createProjectApi'

export function useCreateProject() {
  const { mutateAsync } = useMutation({
    mutationFn: createProjectApi,
    onSuccess: () => {
      console.log('Project created successfully')

    },
    onError: () => {
      console.log('Error creating project')
    },
  })

  return { mutateAsync }
}
