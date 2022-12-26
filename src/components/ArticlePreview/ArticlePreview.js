import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Tag } from 'antd'
import { Link } from 'react-router-dom'

import { fetchSetFavoriteArticle, fetchDeleteFavoriteArticle } from '../../store/articleSlice'

import Creator from './Creator'
import like from './like.svg'
import activeLike from './activeLike.svg'
import styles from './ArticlePreview.module.scss'

const { Paragraph, Text } = Typography

const ArticlePreview = ({ article, children, singlePage }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(article.favoritesCount)
  const [favorited, setFavorited] = useState(article.favorited)
  const auth = useSelector((state) => state.user.username)
  const isErrorRequest = useSelector((state) => state.articles.isErrorArticlesRequest)

  const sendLike = () => {
    if (favorited && !isErrorRequest) {
      dispatch(fetchDeleteFavoriteArticle(article.slug))
      setLikes(likes - 1)
      setFavorited(false)
    } else if (!isErrorRequest) {
      dispatch(fetchSetFavoriteArticle(article.slug))
      setLikes(likes + 1)
      setFavorited(true)
    }
  }

  return (
    <article className={children ? styles.articleContent : ''}>
      <div className={styles.articleListItem}>
        <div className={styles.articleInfo}>
          <div className={styles.likes}>
            <Link to={`articles/${article.slug}`}>
              <Text level={2} className={styles.articlePrewTitle}>
                {article.title}
              </Text>
            </Link>
            <button className={styles.likesButton} onClick={auth ? sendLike : () => {}} type="button" aria-label="like">
              <img src={favorited ? activeLike : like} alt="like" />
              <span>{likes}</span>
            </button>
          </div>
          <div className={styles.articleTags}>
            {article.tagList.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>
          <Paragraph className={styles.articleDescription}>{article.description}</Paragraph>
        </div>
        <Creator article={article} singlePage={singlePage} />
      </div>
      {children}
    </article>
  )
}

export default ArticlePreview
