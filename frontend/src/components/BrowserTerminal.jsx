import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { io } from 'socket.io-client'
import '@xterm/xterm/css/xterm.css'
import { useParams } from 'react-router-dom'

function BrowserTerminal() {
  const terminalRef = useRef(null)
  const terminalSocket = useRef(null)
  const {projectId} = useParams()
  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 16,
      fontFamily: 'Ubuntu mono',
      convertEol: true,
      theme: {
        background: '#282a37',
        foreground: '#f8f8f3',
        cursor: '#f8f8f3',
        cursorAccent: '#282a37',
        red: '#ff5544',
        green: '#50fa7c',
        yellow: '#f1fa8c',
        cyan: '#8be9fd',
      },
    })
    const fitAddon = new FitAddon()

    term.open(terminalRef.current)
    term.loadAddon(fitAddon)
    fitAddon.fit()

    terminalSocket.current = io(
      `${import.meta.env.VITE_BACKEND_URL}/terminal`,
      {
        query: {
          projectId,
        },
      }
    )

    terminalSocket.current.on('shell-output', (data) => {
      term.write(data)
    })

    term.onData((data) => {
      console.log('LOGGING TERMINAL DATA: ', data)
      terminalSocket.current.emit('shell-input', data)
    })

    return () => {
      term.dispose()
      terminalSocket.current.disconnect()
    }
  }, [])

  return (
    <div
      id="terminal-container"
      className="terminal"
      ref={terminalRef}
      style={{
        height: '25vh',
        overflow: 'auto',
        border: '1px solid',
      }}
    ></div>
  )
}
export default BrowserTerminal
