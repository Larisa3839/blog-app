import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Popconfirm } from 'antd'

import { fetchDeleteArticle } from '../../store/articleSlice'

const ModalWindow = ({ slug }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onDeleteArticle = () => {
    dispatch(fetchDeleteArticle(slug))
    history.push('/articles')
  }
  return (
    <Popconfirm title="Are you sure to delete this article?" okText="Yes" cancelText="No" onConfirm={onDeleteArticle}>
      <Button size="small" type="primary" danger ghost>
        Delete
      </Button>
    </Popconfirm>
  )
}

export default ModalWindow
