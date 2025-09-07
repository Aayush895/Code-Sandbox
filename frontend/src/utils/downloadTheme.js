import axios from 'axios'

export async function downloadTheme(playgroundTheme, monaco) {
  try {
    const { data } = await axios.get(`/themes/${playgroundTheme}.json`)

    monaco.editor.defineTheme(`${playgroundTheme}`, data)
    monaco.editor.setTheme(`${playgroundTheme}`)
  } catch (error) {
    console.log('Error in downloading the playground theme: ', error)
    throw error
  }
}
