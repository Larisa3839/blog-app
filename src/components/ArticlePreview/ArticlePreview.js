import { format, parseISO } from 'date-fns'
import { Avatar, Typography, Statistic, Tag } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import styles from './ArticlePreview.module.scss'

const { Paragraph, Text } = Typography

const ArticlePreview = ({ article, children }) => (
  <article className={children ? styles.articleContent : ''}>
    <div className={styles.articleListItem}>
      <div className={styles.articleInfo}>
        <div className={styles.likes}>
          <Link to={`articles/${article.slug}`}>
            <Text level={2} className={styles.articlePrewTitle}>
              {article.title}
            </Text>
          </Link>
          <Statistic value={article.favoritesCount} prefix={<HeartOutlined />} />
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
      </div>
    </div>
    {children}
  </article>
)

export default ArticlePreview
