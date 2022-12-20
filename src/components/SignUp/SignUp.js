import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Form, Input, Typography, Checkbox } from 'antd'

import styles from './SignUp.module.scss'

const { Text } = Typography

const schema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required(),
  agree: yup
    .boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
})

const SignUp = ({ handleFormSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onFinish = (data) => {
    handleFormSubmit(data)
  }

  return (
    <div className={styles.wrapperForm}>
      <Text className={styles.titleForm} level={2}>
        Sign Up
      </Text>
      <Form layout="vertical" name="normal_login" className="login-form" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          help={errors?.username?.message}
          validateStatus={errors.username ? 'error' : 'success'}
          name="username"
          label="Username"
        >
          <Controller
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
            render={({ field }) => <Input placeholder="Password" {...register('password')} {...field} />}
          />
        </Form.Item>
        <Form.Item
          help={errors?.repeatPassword?.message}
          validateStatus={errors.repeatPassword ? 'error' : 'success'}
          name="repeat-password"
          label="Repeat Password"
        >
          <Controller
            control={control}
            name="repeatPassword"
            render={({ field }) => <Input placeholder="Repeat Password" {...register('repeatPassword')} {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item
            valuePropName="checked"
            help={errors?.agree?.message}
            validateStatus={errors.agree ? 'error' : 'success'}
            name="agree"
          >
            <Controller
              name="agree"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox onChange={onChange} checked={value}>
                  I agree to the processing of my personal information
                </Checkbox>
              )}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.buttonForm}>
            Create
          </Button>
          <div className={styles.formLink}>
            Already have an account? Sign In. <Link to="/sign-in">Sign In</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
export default SignUp
