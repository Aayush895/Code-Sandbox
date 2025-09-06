import { usePing } from './hooks/queries/usePing'

function App() {
  const { data, isLoading } = usePing()

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return <div>{data.message}</div>
}

export default App
