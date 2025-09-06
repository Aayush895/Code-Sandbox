import { useParams } from 'react-router-dom'

function ProjectPlayground() {
  const { projectId } = useParams()
  return <div>Welcome to Project playground - project ID: {projectId}</div>
}
export default ProjectPlayground
