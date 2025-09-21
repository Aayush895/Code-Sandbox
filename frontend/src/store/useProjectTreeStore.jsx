import { create } from 'zustand'
import { QueryClient } from '@tanstack/react-query'
import { getProjectTree } from '../apis/getProjectTree'

export const useProjectTreeStore = create((set) => {
  const queryClient = new QueryClient()

  return {
    projectTreeStruc: null,
    setProjectTreeStruc: async (projectId) => {
      const treeData = await queryClient.fetchQuery({
        queryKey: [`projectTree: ${projectId}`],
        queryFn: () => getProjectTree({ projectId }),
      })

      set({
        projectTreeStruc: treeData,
      })
    },
  }
})
