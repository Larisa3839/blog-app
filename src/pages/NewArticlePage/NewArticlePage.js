import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'

import NewArticle from '../../components/NewArticle/NewArticle'
import { fetchCreateArticle, fetchGetArticles } from '../../store/articleSlice'

const NewArticlePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const errorRequest = useSelector((state) => state.articles.isErrorArticlesRequest)

  const handleFormSubmit = (data, tagList) => {
    dispatch(fetchCreateArticle({ ...data, tagList }))
    dispatch(fetchGetArticles)
    history.push('/')
  }
  const errMessage = errorRequest ? <Alert message="Error Text" description="Fetch login error" type="error" /> : null
  return errMessage || <NewArticle handleFormSubmit={handleFormSubmit} />
}

export default NewArticlePage
