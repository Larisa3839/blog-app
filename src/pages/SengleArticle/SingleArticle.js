import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Typography } from 'antd'

import ArticlePreview from '../../components/ArticlePreview'
import { fetchSingleArticle } from '../../store/articleSlice'
import Spiner from '../../components/Spiner'

import './SingleArticle.css'

const { Paragraph } = Typography

const SingleArticle = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const isLoading = useSelector((state) => state.articles.isLoadingArticles)

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [dispatch, slug])

  const article = useSelector((state) => state.articles.singleArticle)

  const spiner = isLoading ? <Spiner /> : null
  const content = article ? (
    <div>
      <ArticlePreview article={article}>
        <Paragraph>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </Paragraph>
      </ArticlePreview>
    </div>
  ) : null

  return (
    <>
      {spiner}
      {content}
    </>
  )
}

export default SingleArticle
