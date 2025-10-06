/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProjectFolderTree from './ProjectFolderTree'
import { useProjectTreeStore } from '../store/useProjectTreeStore'

function ProjectFolder() {
  const { projectTreeStruc, setProjectTreeStruc } = useProjectTreeStore()

  const { projectId } = useParams()

  useEffect(() => {
    setProjectTreeStruc(projectId)
  }, [projectId])

  return (
    <div>
      <ProjectFolderTree folderData={projectTreeStruc} />
    </div>
  )
}
export default ProjectFolder
