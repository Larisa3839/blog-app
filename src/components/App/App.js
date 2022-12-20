import { Route } from 'react-router-dom'

import Header from '../Header'
import Main from '../Main'
import ArticleList from '../../pages/ArticleList'
import SingleArticle from '../../pages/SengleArticle'
import NewArticlePage from '../../pages/NewArticlePage'
import EditArticle from '../../pages/EditArticle'
import { SignInPage, SignUpPage, EditProfilePage } from '../../pages/formsComponent'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <Main>
        <Route path="/" exact component={ArticleList} />
        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/:slug" exact component={SingleArticle} />
        <Route path="/articles/:slug/edit" exact component={EditArticle} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/profile" component={EditProfilePage} />
        <Route path="/new-article" component={NewArticlePage} />
      </Main>
    </>
  )
}

export default App
