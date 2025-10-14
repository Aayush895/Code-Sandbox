import { create } from 'zustand'

export const useFileContextMenuStore = create((set) => ({
  xPosition: null,
  yPosition: null,
  isFileContextOpen: false,
  file: null,
  setxPosition: (incomingX) => {
    set({ xPosition: incomingX })
  },
  setyPosition: (incomingY) => {
    set({ yPosition: incomingY })
  },
  setisFileContextOpen: (incomingIsOpen) => {
    set({ isFileContextOpen: incomingIsOpen })
  },
  setFile: (incomingFilePath) => {
    set({ file: incomingFilePath })
  },
}))
