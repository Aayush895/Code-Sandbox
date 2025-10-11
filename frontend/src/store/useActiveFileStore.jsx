import { create } from 'zustand'

export const useActiveFileStore = create((set) => {
  return {
    activeFile: null,
    setActiveFile: (path, fileContent, extension) => {
      set({
        activeFile: {
          path,
          fileContent,
          extension,
        },
      })
    },
  }
})
