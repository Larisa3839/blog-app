import { Link } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import styles from './SignIn.css'
const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div style={styles.wrapperForm}>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
          Don’t have an account?<Link to="/sign-up">Sign Up</Link>
        </Form.Item>
      </Form>
    </div>
  )
}
export default SignIn
