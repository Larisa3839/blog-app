import { Button, Form, Input, Typography } from 'antd'

import styles from './EditProfile.module.scss'

const { Text } = Typography
const SignUp = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className={styles.wrapperForm}>
      <Text className={styles.titleForm} level={2}>
        Edit Profile
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
          name="New password"
          label="New password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input type="password" placeholder="New password" />
        </Form.Item>
        <Form.Item
          name="Avatar"
          label="Avatar image (url)"
          rules={[
            {
              required: true,
              message: 'Please imput url!',
            },
          ]}
        >
          <Input type="password" placeholder="Avatar image" />
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
export default SignUp
