import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'

import NewArticle from '../../../components/NewArticle'
import { fetchCreateArticle } from '../../../store/articleSlice'

const NewArticlePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const errorRequest = useSelector((state) => state.articles.isErrorArticlesRequest)
  const isCreated = useSelector((state) => state.articles.articleIsCreated)

  useEffect(() => {
    if (isCreated) history.push('/articles')
  }, [dispatch, isCreated])

  const handleFormSubmit = (data, tagList) => {
    dispatch(fetchCreateArticle({ ...data, tagList }))
  }
  const errMessage = errorRequest ? <Alert message="Error Text" description="Fetch login error" type="error" /> : null
  return errMessage || <NewArticle handleFormSubmit={handleFormSubmit} />
}

export default NewArticlePage
