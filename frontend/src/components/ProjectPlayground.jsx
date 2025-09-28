import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { Typography, Select } from 'antd'
import { useLoadTheme } from '../hooks/useLoadTheme'
import ProjectFolder from './ProjectFolder'
import styles from '../styles/ProjectPlayground.module.css'

const { Title } = Typography

function ProjectPlayground() {
  const [playgroundTheme, setplaygroundTheme] = useState('Dracula')
  const { projectId } = useParams()

  useLoadTheme(playgroundTheme)

  function handleChange(value) {
    setplaygroundTheme(value)
  }

  return (
    <div className={styles.playgroundContainer}>
      {' '}
      <Title level={3} className={styles.playgroundTitle}>
        Welcome to Project Playground — Project ID: {projectId}{' '}
      </Title>
      <div className={styles.playgroundContent}>
        {/* Left Sidebar: Folder Tree */}
        <aside className={styles.folderSidebar}>
          <ProjectFolder />
        </aside>

        {/* Right Section: Editor */}
        <main className={styles.editorSection}>
          <div className={styles.editorToolbar}>
            <span className={styles.themeLabel}>Theme:</span>
            <Select
              defaultValue={playgroundTheme}
              className={styles.themeSelect}
              onChange={handleChange}
              options={[
                { value: 'Active4D', label: 'Active4D' },
                { value: 'Tomorrow', label: 'Tomorrow' },
                { value: 'Dracula', label: 'Dracula' },
                { value: 'Cobalt2', label: 'Cobalt2' },
                { value: 'NightOwl', label: 'NightOwl' },
              ]}
            />
          </div>

          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// Welcome to the code playground"
            theme={playgroundTheme}
          />
        </main>
      </div>
    </div>
  )
}

export default ProjectPlayground
