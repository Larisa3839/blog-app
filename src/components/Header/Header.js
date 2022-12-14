import { Button, Typography } from 'antd'

import './Header.css'
const { Title } = Typography

const Header = () => {
  return (
    <header className="header">
      <Title className="header__title">Realworld Blog</Title>
      <div className="header_buttons">
        <Button className="button" type="text">
          Sign In
        </Button>
        <Button className="button" type="text">
          Sign Up
        </Button>
      </div>
    </header>
  )
}

export default Header
