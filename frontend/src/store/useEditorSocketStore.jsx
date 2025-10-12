import { create } from 'zustand'
import { useActiveFileStore } from './useActiveFileStore'

export const useEditorSocketStore = create((set) => {
  return {
    editorSocket: null,
    setEditorSocket: (incomingEditorSocket) => {
      const activeFileSetterFn = useActiveFileStore.getState().setActiveFile
      
      incomingEditorSocket?.on('readFileSuccess', (data) => {
        activeFileSetterFn(data?.activeFile, data?.data)
      })

      incomingEditorSocket?.on('writeFileSuccess', (data) => {
        console.log('LOGGING data: ', data)
      })

      set(() => ({ editorSocket: incomingEditorSocket }))
    },
  }
})
