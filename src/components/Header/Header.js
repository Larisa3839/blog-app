import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd'

import './Header.css'
const { Title } = Typography

const Header = () => {
  return (
    <header className="header">
      <Title className="header__title">Realworld Blog</Title>
      <div className="header_buttons">
        <Link to="/sign-in">
          <Button className="button" type="text">
            Sign In
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button className="button" type="text">
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
