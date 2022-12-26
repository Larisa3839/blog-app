/* eslint-disable prettier/prettier */
import { Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ArticlePreview from '../../ArticlePreview'
import { fetchGetArticles } from '../../../store/articleSlice'
import Spiner from '../../Spiner'

import './ArticleList.css'

const ArticleList = () => {
  const [offset, setOffset] = useState(0)
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articles)
  const isLoading = useSelector((state) => state.articles.isLoadingArticles)
  const articlesCount = useSelector((state) => state.articles.articlesCount)

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 5, offset }))
  }, [dispatch, offset])

  const spiner = isLoading ? <Spiner /> : null
  const articlesList = articles.length
    ? articles.map((article) => {
      return (
        <li key={article.slug}>
          <ArticlePreview article={article} />
        </li>
      )
    })
    : null
  return (
    <>
      <ul className="article-list">
        {spiner}
        {articlesList}
      </ul>
      <Pagination size="small" current={offset / 5 + 1} onChange={(num) => setOffset((num - 1) * 5)} total={Math.ceil(articlesCount / 5)*10} />
    </>
  )
}

export default ArticleList
