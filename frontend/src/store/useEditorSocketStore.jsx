import { create } from 'zustand'
import { useActiveFileStore } from './useActiveFileStore'
import { useProjectTreeStore } from './useProjectTreeStore'
import { usePortStore } from './usePortStore'

export const useEditorSocketStore = create((set) => {
  return {
    editorSocket: null,
    setEditorSocket: (incomingEditorSocket) => {
      const activeFileSetterFn = useActiveFileStore.getState().setActiveFile
      const setProjectTreeStructure =
        useProjectTreeStore.getState().setProjectTreeStruc

      const setContainerPort = usePortStore.getState().setPort

      incomingEditorSocket?.on('readFileSuccess', (data) => {
        activeFileSetterFn(data?.activeFile, data?.data)
      })

      incomingEditorSocket?.on('writeFileSuccess', (data) => {
        incomingEditorSocket.emit('readFile', {
          pathToFileOrFolder: data?.file,
        })
      })

      incomingEditorSocket?.on('deleteFolderSuccess', async (data) => {
        setProjectTreeStructure(data?.projectId)
      })

      incomingEditorSocket?.on('deleteFileSuccess', (data) => {
        setProjectTreeStructure(data?.projectId)
      })

      incomingEditorSocket?.on('getPortSuccess', ({ port }) => {
        setContainerPort(port)
      })

      set(() => ({ editorSocket: incomingEditorSocket }))
    },
  }
})
