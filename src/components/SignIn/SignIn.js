import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Form, Typography, Input } from 'antd'

import styles from './SignIn.module.scss'

const { Text } = Typography

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const SignIn = ({ handleFormSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onFinish = (data) => {
    console.log('Received data of form: ', data)
    handleFormSubmit(data)
  }
  return (
    <div className={styles.wrapperForm}>
      <Text className={styles.titleForm} level={2}>
        Sign In
      </Text>
      <Form layout="vertical" name="normal_login" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          help={errors?.email?.message}
          validateStatus={errors.email ? 'error' : 'success'}
          name="email"
          label="Email address"
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input placeholder="Email address" {...register('email')} {...field} />}
          />
        </Form.Item>
        <Form.Item
          help={errors?.password?.message}
          validateStatus={errors.password ? 'error' : 'success'}
          name="password"
          label="Password"
        >
          <Controller
            control={control}
            name="password"
            render={({ field }) => <Input placeholder="password" {...register('password')} {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.buttonForm}>
            Login
          </Button>
          <div className={styles.formLink}>
            Don’t have an account? <Link to="/sign-up">Sign Up</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
export default SignIn
