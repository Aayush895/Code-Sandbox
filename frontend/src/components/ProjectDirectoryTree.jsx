import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectTreeStore } from '../store/useProjectTreeStore'

function ProjectDirectoryTree() {
  const { projectTreeStruc, setProjectTreeStruc } = useProjectTreeStore()
  const { projectId } = useParams()

  useEffect(() => {
    if (projectTreeStruc) {
      console.log(projectTreeStruc)
    } else {
      setProjectTreeStruc(projectId)
    }
  }, [projectTreeStruc, projectId, setProjectTreeStruc])

  return <div>Tree Structure - {projectId}</div>
}
export default ProjectDirectoryTree
