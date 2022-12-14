import { Layout } from 'antd'

import './Main.css'
const { Content } = Layout
const Main = ({ children }) => {
  return <Content className="main">{children}</Content>
}

export default Main
