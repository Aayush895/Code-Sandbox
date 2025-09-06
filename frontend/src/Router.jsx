import { Routes, Route } from 'react-router-dom'
import CreateProject from './components/CreateProject'
import ProjectPlayground from './components/ProjectPlayground'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
      <Route path="/project/:projectId" element={<ProjectPlayground />} />
    </Routes>
  )
}
export default Router
