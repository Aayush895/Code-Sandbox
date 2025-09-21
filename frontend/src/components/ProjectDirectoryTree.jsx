import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectTreeStore } from '../store/useProjectTreeStore'

function ProjectDirectoryTree() {
  const { projectTreeStruc, setProjectTreeStruc } = useProjectTreeStore()
  const { projectId } = useParams()

  useEffect(() => {
    setProjectTreeStruc(projectId)
  }, [])

  console.log('LOG TREE STRUC: ', projectTreeStruc)
  return <div>Tree Structure - {projectId}</div>
}
export default ProjectDirectoryTree
