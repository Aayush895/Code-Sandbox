import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { useCreateProject } from '../hooks/mutations/useCreateProject'
import styles from '../styles/CreateProject.module.css'

const { Title } = Typography

function CreateProject() {
  const navigate = useNavigate()
  const { mutateAsync } = useCreateProject()

  async function handleProjectCreation() {
    try {
      const response = await mutateAsync()
      navigate(`/project/${response.projectId}`)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <div className={styles.container}>
      <Title
        level={1}
        className={styles.header}
        style={{
          color: '#40a9ff' /* AntD primary blue */,
        }}
      >
        Welcome to code-sandbox
      </Title>

      <div className={styles.box}>
        <Title
          level={3}
          className={styles.subtitle}
          style={{ color: '#d4d4d4' /* AntD primary blue */ }}
        >
          To create a React project, click the button below
        </Title>

        <Button
          type="primary"
          size="large"
          onClick={handleProjectCreation}
          className={styles.button}
        >
          Create Project
        </Button>
      </div>
    </div>
  )
}

export default CreateProject
