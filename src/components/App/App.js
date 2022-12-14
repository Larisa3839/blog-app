import { Route } from 'react-router-dom'

import Header from '../Header'
import Main from '../Main'
//import Layout from '../Layout'
import ArticleList from '../../pages/ArticleList'
import SingleArticle from '../../pages/SengleArticle'
import SignIn from '../../pages/SignIn'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <Main>
        <Route path="/" exact component={ArticleList} />
        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/:slug" component={SingleArticle} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" />
        <Route path="/profile" />
      </Main>
    </>
  )
}

export default App
