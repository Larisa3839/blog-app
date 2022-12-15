import { Link } from 'react-router-dom'
import { Avatar, Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../../store/userSlice'

import styles from './Header.module.scss'
const { Title, Text } = Typography

const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user.email)
  return (
    <header className={styles.header}>
      <Link to="/">
        <Title className={styles.title}>Realworld Blog</Title>
      </Link>
      {!auth && (
        <div className={styles.headerButtons}>
          <Link to="/sign-in">
            <Button>Sign In</Button>
          </Link>
          <Link to="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
      {auth && (
        <div className={styles.authButtons}>
          <Link to="/new-article">
            <Button size="small">Create article</Button>
          </Link>
          <Link to="/profale">
            <div className={styles.avatar}>
              <Text className={styles.text}>John Doe</Text>
              <Avatar size={46} src="https://losslessclub.com/attachs/artist_33566_41294.jpg" />
            </div>
          </Link>
          <Link to="/articles">
            <Button onClick={dispatch(logOut())}>Log Out</Button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
