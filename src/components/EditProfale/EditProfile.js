import { useSelector } from 'react-redux'
import { Button, Form, Input, Typography } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './EditProfile.module.scss'

const { Text } = Typography

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  newPassword: yup.string().min(6).max(40),
  avatar: yup.string().url(),
})

const EditProfile = ({ handleFormSubmit }) => {
  const { username, email, image } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  console.log(username, email, image)
  const onFinish = (data) => {
    console.log('Received data of form: ', data)
    handleFormSubmit(data)
  }
  return (
    <div className={styles.wrapperForm}>
      <Text className={styles.titleForm} level={2}>
        Edit Profile
      </Text>
      <Form layout="vertical" name="normal_login" className="login-form" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          help={errors?.username?.message}
          validateStatus={errors.username ? 'error' : 'success'}
          name="username"
          label="Username"
        >
          <Controller
            defaultValue={username}
            control={control}
            name="username"
            render={({ field }) => <Input placeholder="Username" {...register('username')} {...field} />}
          />
        </Form.Item>
        <Form.Item
          help={errors?.email?.message}
          validateStatus={errors.email ? 'error' : 'success'}
          name="email"
          label="Email address"
        >
          <Controller
            defaultValue={email}
            control={control}
            name="email"
            render={({ field }) => <Input placeholder="Email address" {...register('email')} {...field} />}
          />
        </Form.Item>
        <Form.Item
          help={errors?.newPassword?.message}
          validateStatus={errors.newPassword ? 'error' : 'success'}
          name="newPassword"
          label="Password"
        >
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => <Input placeholder="Password" {...register('newPassword')} {...field} />}
          />
        </Form.Item>
        <Form.Item
          help={errors?.avatar?.message}
          validateStatus={errors.avatar ? 'error' : 'success'}
          name="avatar"
          label="Avatar image (url)"
        >
          <Controller
            control={control}
            name="avatar"
            render={({ field }) => <Input {...register('avatar')} {...field} placeholder="Avatar image" />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.buttonForm}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default EditProfile
