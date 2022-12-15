import { Link } from 'react-router-dom'
import { Button, Form, Input, Typography } from 'antd'

import styles from './SignIn.module.scss'

const { Text } = Typography
const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className={styles.wrapperForm}>
      <Text className={styles.titleForm} level={2}>
        Sign In
      </Text>
      <Form layout="vertical" name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email address"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
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
