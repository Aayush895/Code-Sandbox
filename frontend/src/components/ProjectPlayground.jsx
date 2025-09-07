import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { Typography, Select } from 'antd'
import { useLoadTheme } from '../hooks/useLoadTheme'

const { Title } = Typography
function ProjectPlayground() {
  const [playgroundTheme, setplaygroundTheme] = useState('Dracula')
  const { projectId } = useParams()

  useLoadTheme(playgroundTheme)

  function handleChange(value) {
    setplaygroundTheme(value)
  }

  console.log(`Selected value is: ${playgroundTheme}`)

  return (
    <>
      <Title level={1} type="success" style={{ textAlign: 'center' }}>
        Welcome to Project playground - project ID: {projectId}
      </Title>

      <Select
        defaultValue={playgroundTheme}
        style={{ width: 120, marginBottom: 13 }}
        onChange={handleChange}
        options={[
          { value: 'Active4D', label: 'Active4D' },
          { value: 'Tomorrow', label: 'Tomorrow' },
          { value: 'Dracula', label: 'Dracula' },
          { value: 'Cobalt2', label: 'Cobalt2' },
          { value: 'NightOwl', label: 'NightOwl' },
        ]}
      />

      <Editor
        height="80vh"
        defaultLanguage="javascript"
        defaultValue="// Welcome to the code playground"
        theme={playgroundTheme}
      />
    </>
  )
}
export default ProjectPlayground
