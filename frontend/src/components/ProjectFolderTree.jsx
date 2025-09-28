import { useState } from 'react'
import { FaFolder, FaFolderOpen, FaFileCode } from 'react-icons/fa'
import styles from '../styles/ProjectFolderTree.module.css'

function ProjectFolderTree({ folderData }) {
  const [foldersVisibility, setFoldersVisibility] = useState({})

  function handleFolderExpansion(folderName) {
    setFoldersVisibility({
      ...foldersVisibility,
      [folderName]: !foldersVisibility[folderName],
    })
  }

  return (
    folderData && (
      <div className={styles.folderNode}>
        {folderData.children ? (
          <div
            className={styles.folderItem}
            onClick={() => handleFolderExpansion(folderData?.name)}
          >
            {foldersVisibility[folderData?.name] ? (
              <FaFolderOpen className={styles.folderIcon} title="Open Folder" size={35}/>
            ) : (
              <FaFolder className={styles.folderIcon} title="Closed Folder" size={35}/>
            )}{' '}
            <span className={styles.folderName}>{folderData?.name}</span>{' '}
          </div>
        ) : (
          <div className={styles.fileItem}>
            {' '}
            <FaFileCode className={styles.fileIcon} title="Code File" size={30}/>{' '}
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
