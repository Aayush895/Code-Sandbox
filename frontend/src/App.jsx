import { io } from 'socket.io-client'
import Router from './Router'

const socket = io('http://localhost:3000')
function App() {
  return <Router />
}

export default App
