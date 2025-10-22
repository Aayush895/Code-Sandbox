import { useState } from 'react'
import { FaFolder, FaFolderOpen, FaFileCode } from 'react-icons/fa'
import styles from '../styles/ProjectFolderTree.module.css'
import { useEditorSocketStore } from '../store/useEditorSocketStore'
import { useFileContextMenuStore } from '../store/useFileContextMenuStore'
import { useActiveFolderStore } from '../store/useActiveFolderStore'

function ProjectFolderTree({ folderData }) {
  const [foldersVisibility, setFoldersVisibility] = useState({})
  const { editorSocket } = useEditorSocketStore()
  const { setxPosition, setyPosition, setisFileContextOpen, setFile } =
    useFileContextMenuStore()

  const { setxCoordinate, setyCoordinate, setisFolderContextOpen, setFolder } =
    useActiveFolderStore()

  function handleFolderExpansion(folderName) {
    setFoldersVisibility({
      ...foldersVisibility,
      [folderName]: !foldersVisibility[folderName],
    })
  }

  // This function should retrieve the contents of a file or boiler-plate code on double click of a file
  function handleDoubleClickOnFiles() {
    let fileName = folderData?.path?.split('/')
    editorSocket.emit('readFile', {
      pathToFileOrFolder: folderData?.path,
    })

    editorSocket.emit('join-file-room', {
      file: fileName[fileName.length - 1],
    })
  }

  // This function runs on right mouse click and shows the context menu
  function handleShowContextMenu(e, clickedFolderOrFile) {
    e.preventDefault()
    clickedFolderOrFile?.children
      ? setxCoordinate(e.clientX)
      : setxPosition(e.clientX)
    clickedFolderOrFile?.children
      ? setyCoordinate(e.clientY)
      : setyPosition(e.clientY)
    clickedFolderOrFile?.children
      ? setisFolderContextOpen(true)
      : setisFileContextOpen(true)
    clickedFolderOrFile?.children
      ? setFolder(clickedFolderOrFile)
      : setFile(clickedFolderOrFile)
  }

  return (
    folderData && (
      <div className={styles.folderNode}>
        {folderData.children ? (
          <div
            className={styles.folderItem}
            onClick={() => handleFolderExpansion(folderData?.name)}
            onContextMenu={(e) => handleShowContextMenu(e, folderData)}
          >
            {foldersVisibility[folderData?.name] ? (
              <FaFolderOpen
                className={styles.folderIcon}
                title="Open Folder"
                size={35}
              />
            ) : (
              <FaFolder
                className={styles.folderIcon}
                title="Closed Folder"
                size={35}
              />
            )}{' '}
            <span className={styles.folderName}>{folderData?.name}</span>{' '}
          </div>
        ) : (
          <div
            className={styles.fileItem}
            onDoubleClick={handleDoubleClickOnFiles}
            onContextMenu={(e) => handleShowContextMenu(e, folderData)}
          >
            {' '}
            <FaFileCode
              className={styles.fileIcon}
              title="Code File"
              size={30}
            />{' '}
            <span className={styles.fileName}>{folderData?.name}</span>{' '}
          </div>
        )}
        {foldersVisibility[folderData?.name] &&
          folderData?.children?.map((folder) => (
            <ProjectFolderTree folderData={folder} key={folder?.name} />
          ))}
      </div>
    )
  )
}

export default ProjectFolderTree