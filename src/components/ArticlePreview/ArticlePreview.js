import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Avatar, Typography, Tag, Button, Popconfirm } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import { fetchDeleteArticle, fetchSetFavoriteArticle, fetchDeleteFavoriteArticle } from '../../store/articleSlice'

import like from './like.svg'
import activeLike from './activeLike.svg'
import styles from './ArticlePreview.module.scss'

const { Paragraph, Text } = Typography

const ArticlePreview = ({ article, children, singlePage }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [likes, setLikes] = useState(article.favoritesCount)
  const [favorited, setFavorited] = useState(article.favorited)
  const auth = useSelector((state) => state.user.username)
  const isErrorRequest = useSelector((state) => state.articles.isErrorArticlesRequest)
  const userLoggedIn = useSelector((state) => state.user.username)

  const onDeleteArticle = () => {
    dispatch(fetchDeleteArticle(article.slug))
    history.push('/articles')
  }

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
        <div className={styles.articleAuthor}>
          <div className={styles.articleAuthorDate}>
            <Text>{article.author.username}</Text>
            <Text type="secondary">{format(parseISO(article.createdAt), 'MMMM dd, yyyy')}</Text>
          </div>
          <Avatar size={46} src={article.author.image} />
          {singlePage && userLoggedIn === article.author.username && (
            <div className={styles.articleButtons}>
              <Popconfirm
                title="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                onConfirm={onDeleteArticle}
              >
                <Button size="small" type="primary" danger ghost>
                  Delete
                </Button>
              </Popconfirm>
              <Link to={`/articles/${article.slug}/edit`}>
                <Button size="small" type="primary" ghost>
                  Edit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {children}
    </article>
  )
}

export default ArticlePreview
