/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { Typography, Select, Button } from 'antd'
import { io } from 'socket.io-client'
import { useLoadTheme } from '../hooks/useLoadTheme'
import ProjectFolder from './ProjectFolder'
import { useEditorSocketStore } from '../store/useEditorSocketStore'
import styles from '../styles/ProjectPlayground.module.css'
import { useActiveFileStore } from '../store/useActiveFileStore'
import { useFileContextMenuStore } from '../store/useFileContextMenuStore'
import ContextMenu from './ContextMenu'
import { useActiveFolderStore } from '../store/useActiveFolderStore'
import BrowserTerminal from './BrowserTerminal'
import { useTerminalStore } from '../store/useTerminalStore'
import Browser from './Browser'

const { Title } = Typography

function ProjectPlayground() {
  const [playgroundTheme, setplaygroundTheme] = useState('Dracula')
  const [loadBrowser, setLoadBrowser] = useState(false)

  const { editorSocket, setEditorSocket } = useEditorSocketStore()
  const { activeFile } = useActiveFileStore()
  const { isFileContextOpen, file, setisFileContextOpen, setFile } =
    useFileContextMenuStore()
  const { isFolderContextOpen, setisFolderContextOpen, folder, setFolder } =
    useActiveFolderStore()

  const { terminalSocket } = useTerminalStore()

  const { projectId } = useParams()

  useLoadTheme(playgroundTheme)

  function handleHideContextMenu() {
    // TODO: Below commented code generates a bug for context menus. Please use the debugger in order to learn how to use the debugger and debug the code
    // isFileContextOpen && setisFileContextOpen(false)
    // isFolderContextOpen && setisFolderContextOpen(false)

    if (isFileContextOpen) {
      setisFileContextOpen(false)
      setFile(null)
    }
    if (isFolderContextOpen) {
      setisFolderContextOpen(false)
      setFolder(null)
    }
  }

  function handleChange(value) {
    setplaygroundTheme(value)
  }

  let timerId = null
  function handleWriteFile(value) {
    if (timerId != null) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      editorSocket.emit('writeFile', {
        data: value,
        pathToFileOrFolder: activeFile?.path,
      })
    }, 2000)
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

  return (
    <>
      <div
        className={styles.playgroundContainer}
        onClick={handleHideContextMenu}
      >
        {' '}
        <Title level={3} className={styles.playgroundTitle}>
          Welcome to Project Playground — Project ID: {projectId}{' '}
        </Title>
        <div className={styles.playgroundContent}>
          {/* Left Sidebar: Folder Tree */}
          <aside className={styles.folderSidebar}>
            {((isFileContextOpen && file) ||
              (isFolderContextOpen && folder)) && <ContextMenu />}
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
            <BrowserTerminal />
          </main>
        </div>
      </div>
      <div>
        <Button onClick={() => setLoadBrowser(true)}>Load my browser</Button>
        {loadBrowser && projectId && terminalSocket && (
          <Browser projectId={projectId} />
        )}
      </div>
    </>
  )
}

export default ProjectPlayground
