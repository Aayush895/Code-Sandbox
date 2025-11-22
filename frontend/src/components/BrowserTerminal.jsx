/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { AttachAddon } from '@xterm/addon-attach'
import '@xterm/xterm/css/xterm.css'
import { useParams } from 'react-router-dom'
import { useTerminalStore } from '../store/useTerminalStore'

function BrowserTerminal() {
  const terminalRef = useRef(null)
  const { projectId } = useParams()
  const { setTerminalSocket } = useTerminalStore()
  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 16,
      fontFamily: 'Fira Code',
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

    const ws = new WebSocket(
      'ws://localhost:4000/terminal?projectId=' + projectId
    )

    setTerminalSocket(ws)

    ws.onopen = () => {
      const attachAddon = new AttachAddon(ws)
      term.loadAddon(attachAddon)
    }

    return () => {
      term.dispose()
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
