import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Alert } from 'antd'

import { fetchSingleArticle, fetchEditArticle } from '../../../store/articleSlice'
import NewArticle from '../../../components/NewArticle'

const EditArticle = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { slug } = useParams()
  const article = useSelector((state) => state.articles.singleArticle)
  const error = useSelector((state) => state.articles.isErrorArticlesRequest)

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [dispatch, slug])

  const handlerFormSubmit = (data, tagList) => {
    dispatch(fetchEditArticle({ ...data, tagList, slug }))
    history.push('/articles')
  }

  const errorMessage = error ? <Alert message="Error Text" description="Fetch error" type="error" /> : null
  return errorMessage || <NewArticle article={article} handleFormSubmit={handlerFormSubmit} editArticle />
}

export default EditArticle
