//import { withRouter } from 'react-router-dom'

import Header from '../Header'
import Main from '../Main'
//import ArticleList from '../../pages/ArticleList/ArticleList'

import './Layout.css'

function Layout(props) {
  console.log(props)
  return (
    <>
      <Header />
      <Main></Main>
    </>
  )
}

export default Layout
