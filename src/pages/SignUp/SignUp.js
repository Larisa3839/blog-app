import { Link } from 'react-router-dom'
import { Button, Form, Input, Typography, Checkbox } from 'antd'

import styles from './SignUp.module.scss'

const { Text } = Typography
const SignUp = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className={styles.wrapperForm}>
      <Text className={styles.titleForm} level={2}>
        Sign Up
      </Text>
      <Form layout="vertical" name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email address"
          rules={[
            {
              required: true,
              message: 'Please input your Email address!',
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
        <Form.Item
          name="repeat-password"
          label="Repeat Password"
          rules={[
            {
              required: true,
              message: 'Please repeat Password!',
            },
          ]}
        >
          <Input type="password" placeholder="Repeat Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="agree" valuePropName="checked" noStyle>
            <Checkbox>I agree to the processing of my personal information</Checkbox>
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
