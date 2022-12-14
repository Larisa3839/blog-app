import { Route } from 'react-router-dom'

import Header from '../Header'
import Main from '../Main'
import Layout from '../Layout'
import ArticleList from '../../pages/ArticleList'
import SingleArticle from '../../pages/SengleArticle'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <Main>
        <Route path="/" exact component={Layout} />
        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/:slug" component={SingleArticle} />
      </Main>
    </>
  )
}

export default App
