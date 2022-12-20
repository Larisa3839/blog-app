import { Layout } from 'antd'

import styles from './Main.module.scss'
const { Content } = Layout
const Main = ({ children }) => {
  return <Content className={styles.main}>{children}</Content>
}

export default Main
