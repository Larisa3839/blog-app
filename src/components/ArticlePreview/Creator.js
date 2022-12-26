import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { Avatar, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'

import ModalWindow from './ModalWindow'
import styles from './ArticlePreview.module.scss'

const { Text } = Typography

const Creator = ({ article, singlePage }) => {
  const userLoggedIn = useSelector((state) => state.user.username)
  return (
    <div className={styles.articleAuthor}>
      <div className={styles.articleAuthorDate}>
        <Text>{article.author.username}</Text>
        <Text type="secondary">{format(parseISO(article.createdAt), 'MMMM dd, yyyy')}</Text>
      </div>
      <Avatar size={46} src={article.author.image} />
      {singlePage && userLoggedIn === article.author.username && (
        <div className={styles.articleButtons}>
          <ModalWindow slug={article.slug} />
          <Link to={`/articles/${article.slug}/edit`}>
            <Button size="small" type="primary" ghost>
              Edit
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Creator
