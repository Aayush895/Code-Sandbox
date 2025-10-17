import { useActiveFolderStore } from '../store/useActiveFolderStore'
import { useFileContextMenuStore } from '../store/useFileContextMenuStore'
import styles from '../styles/ContextMenu.module.css'

function ContextMenu() {
  const { xPosition, yPosition } = useFileContextMenuStore()
  const { xCoordinate, yCoordinate, isFolderContextOpen, folder } =
    useActiveFolderStore()
  return (
    <div
      className={styles.contextMenu}
      style={{
        position: 'absolute',
        top: `${isFolderContextOpen ? yCoordinate : yPosition}px`,
        left: `${isFolderContextOpen ? xCoordinate : xPosition}px`,
      }}
    >
      <button className={styles.menuItem}>
        {folder?.children ? 'Delete Folder' : 'Delete File'}
      </button>
      <button className={styles.menuItem}>
        {folder?.children ? 'Rename Folder' : 'Rename File'}
      </button>
      {folder?.children ? (
        <button className={styles.menuItem}>Create New File</button>
      ) : null}
      {folder?.children && (
        <button className={styles.menuItem}>Create New Folder</button>
      )}
    </div>
  )
}
export default ContextMenu
