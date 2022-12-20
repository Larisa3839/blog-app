import { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './NewArticle.module.scss'

const { Text } = Typography
const { TextArea } = Input

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  text: yup.string().required(),
})

const NewArticle = ({ handleFormSubmit, article, editArticle }) => {
  const [tagList, setTagList] = useState(article?.tagList || [])
  const [tagValue, setTagValue] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      text: article?.body || '',
    },
    resolver: yupResolver(schema),
  })

  const handleClickAddTag = () => {
    setTagList([...tagList, tagValue])
    setTagValue('')
  }

  const handleClickDeleteTag = (id) => {
    setTagList(tagList.filter((_, index) => index !== id))
  }
  const onFinish = (data) => {
    handleFormSubmit(data, tagList)
  }
  return (
    <div className={styles.wrapperForm}>
      <Text className={styles.titleForm} level={2}>
        {editArticle ? 'Edit article' : 'Create new article'}
      </Text>
      <Form layout="vertical" name="normal_login" className="login-form" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          help={errors?.title?.message}
          validateStatus={errors.title ? 'error' : 'success'}
          name="title"
          label="Title"
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => <Input placeholder="Title" {...register('title')} {...field} />}
          />
        </Form.Item>
        <Form.Item
          help={errors?.description?.message}
          validateStatus={errors.description ? 'error' : 'success'}
          name="description"
          label="Short description"
        >
          <Controller
            control={control}
            name="description"
            render={({ field }) => <Input placeholder="Title" {...register('description')} {...field} />}
          />
        </Form.Item>
        <Form.Item
          help={errors?.text?.message}
          validateStatus={errors.text ? 'error' : 'success'}
          name="text"
          label="Text"
        >
          <Controller
            control={control}
            name="text"
            render={({ field }) => (
              <TextArea autoSize={{ minRows: 6 }} placeholder="Text" {...register('text')} {...field} />
            )}
          />
        </Form.Item>
        <Form.Item label="Tags">
          {tagList.map((tag, id) => (
            <div className={styles.tag} key={id}>
              <Input className={styles.inputTag} value={tag} />
              <Button className={styles.buttonTag} type="primary" danger ghost onClick={() => handleClickDeleteTag(id)}>
                Delete
              </Button>
            </div>
          ))}
          <div className={styles.tag}>
            <Input
              value={tagValue}
              className={styles.inputTag}
              placeholder="Tag"
              onChange={(e) => setTagValue(e.target.value)}
            />
            <Button className={styles.buttonTag} type="primary" ghost onClick={handleClickAddTag}>
              Add tag
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.buttonForm}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default NewArticle
