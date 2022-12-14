import { format, parseISO } from 'date-fns'
import { Avatar, Typography, Statistic, Tag } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import './ArticlePreview.css'

const { Paragraph, Text, Title } = Typography

const ArticlePreview = ({ article, children }) => (
  <article className={`${children ? 'article-content' : ''}`}>
    <div className="article-list__item">
      <div className="article__info">
        <div className="article__title-likes">
          <Link to={`${article.slug}`}>
            <Title level={2} href="">
              {article.title}
            </Title>
          </Link>
          <Statistic value={article.favoritesCount} prefix={<HeartOutlined />} />
        </div>
        <div className="article__tags">
          {article.tagList.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
        <Paragraph className="article__description">{article.description}</Paragraph>
      </div>
      <div className="article__autor">
        <div className="article__autor__date">
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
