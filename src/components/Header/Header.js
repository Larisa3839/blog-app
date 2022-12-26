import { Link } from 'react-router-dom'
import { Avatar, Button, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logOut, fetchGetUser } from '../../store/userSlice'
import { getCookie } from '../../utils/cookie'

import styles from './Header.module.scss'
const { Title, Text } = Typography

const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user.email)
  const userName = useSelector((state) => state.user.username)
  const defaultAvatar = 'https://losslessclub.com/attachs/artist_33566_41294.jpg'
  const avatar = useSelector((state) => state.user.image)

  useEffect(() => {
    if (getCookie('token')) dispatch(fetchGetUser())
  }, [dispatch])

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
          <Link to="/profile">
            <div className={styles.avatar}>
              <Text className={styles.text}>{userName}</Text>
              <Avatar size={46} src={avatar ? avatar : defaultAvatar} />
            </div>
          </Link>
          <Link to="/articles">
            <Button onClick={() => dispatch(logOut())}>Log Out</Button>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
