import { useNavigate } from 'react-router-dom'
import { Button, Flex, Typography } from 'antd'
import { useCreateProject } from '../hooks/mutations/useCreateProject'

const boxStyle = {
  width: '100%',
  height: '100vh',
  borderRadius: 6,
  border: '1px solid #40a9ff',
}

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
    <>
      <Title level={1} type="success" italic style={{ textAlign: 'center' }}>
        Welcome to code-sandbox
      </Title>
      <Flex style={boxStyle} justify={'center'} align={'center'} vertical>
        <Title level={3} type="success" italic code>
          To create a react-project click on the below button
        </Title>
        <Button type="primary" size="large" onClick={handleProjectCreation}>
          Create Project
        </Button>
      </Flex>
    </>
  )
}
export default CreateProject
