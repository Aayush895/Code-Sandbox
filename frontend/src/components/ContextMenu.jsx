import { useFileContextMenuStore } from '../store/useFileContextMenuStore'
import styles from '../styles/ContextMenu.module.css'

function ContextMenu() {
  const { xPosition, yPosition } = useFileContextMenuStore()
  return (
    <div
      className={styles.contextMenu}
      style={{
        position: 'absolute',
        top: `${yPosition}px`,
        left: `${xPosition}px`,
      }}
    >
      <button className={styles.menuItem}>Delete File</button>
      <button className={styles.menuItem}>Rename File</button>
      <button className={styles.menuItem}>Create New File</button>
      <button className={styles.menuItem}>Create New Folder</button>
    </div>
  )
}
export default ContextMenu
