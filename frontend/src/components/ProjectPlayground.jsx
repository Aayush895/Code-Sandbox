/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { Typography, Select } from 'antd'
import { io } from 'socket.io-client'
import { useLoadTheme } from '../hooks/useLoadTheme'
import ProjectFolder from './ProjectFolder'
import { useEditorSocketStore } from '../store/useEditorSocketStore'
import styles from '../styles/ProjectPlayground.module.css'
import { useProjectTreeStore } from '../store/useProjectTreeStore'
import { useActiveFileStore } from '../store/useActiveFileStore'

const { Title } = Typography

function ProjectPlayground() {
  const [playgroundTheme, setplaygroundTheme] = useState('Dracula')

  const { editorSocket, setEditorSocket } = useEditorSocketStore()
  const { activeFile, setActiveFile } = useActiveFileStore()
  const { projectTreeStruc } = useProjectTreeStore()
  const { projectId } = useParams()

  useLoadTheme(playgroundTheme)

  function handleChange(value) {
    setplaygroundTheme(value)
  }

  function handleWriteFile(value) {
    console.log(projectTreeStruc)
    editorSocket.emit('writeFile', {
      data: value,
      pathToFileOrFolder: activeFile?.path,
    })
  }

  useEffect(() => {
    if (!projectId) return

    const incomingEditorSocket = io(
      `${import.meta.env.VITE_BACKEND_URL}/editors`,
      {
        query: {
          projectId: projectId,
        },
      }
    )
    setEditorSocket(incomingEditorSocket)
  }, [projectId])

  useEffect(() => {
    if (editorSocket) {
      editorSocket.on('readFileSuccess', (data) => {
        setActiveFile(data?.activeFile, data?.data)
      })
      editorSocket.on('writeFileSuccess', (data) => {
        console.log('LOGGING data: ', data)
      })
    }
  }, [editorSocket])
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
            defaultLanguage={undefined}
            defaultValue="// Welcome to the code playground"
            theme={playgroundTheme}
            value={
              activeFile?.fileContent
                ? activeFile?.fileContent
                : '// Welcome to the code playground'
            }
            onChange={handleWriteFile}
          />
        </main>
      </div>
    </div>
  )
}

export default ProjectPlayground
