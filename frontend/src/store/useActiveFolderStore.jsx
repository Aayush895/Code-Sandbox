import { create } from 'zustand'

export const useActiveFolderStore = create((set) => ({
  xCoordinate: null,
  yCoordinate: null,
  setxCoordinate: (incomingxCoordinate) => {
    set({ xCoordinate: incomingxCoordinate })
  },
  setyCoordinate: (incomingyCoordinate) => {
    set({ yCoordinate: incomingyCoordinate })
  },
  isFolderContextOpen: false,
  setisFolderContextOpen: (incomingFolderOpen) => {
    set({ isFolderContextOpen: incomingFolderOpen })
  },
  folder: null,
  setFolder: (incomingFolderPath) => {
    set({ folder: incomingFolderPath })
  },
}))
