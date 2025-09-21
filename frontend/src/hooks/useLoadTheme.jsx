import { useEffect } from 'react'
import { useMonaco } from '@monaco-editor/react'
import axios from 'axios'

export function useLoadTheme(theme) {
  const monacoInstance = useMonaco()
  useEffect(() => {
    if (!monacoInstance) return

    async function downloadTheme(playgroundTheme) {
      try {
        const { data } = await axios.get(`/themes/${playgroundTheme}.json`)

        monacoInstance.editor.defineTheme(`${playgroundTheme}`, data)
        monacoInstance.editor.setTheme(`${playgroundTheme}`)
      } catch (error) {
        if (error?.type === 'cancelation') {
          return 'This is a monaco-editor issue. This is an expected behaviour'
        }
        console.log('Error in downloading the playground theme: ', error)
        throw error
      }
    }

    downloadTheme(theme, monacoInstance)
  }, [theme, monacoInstance])
}
