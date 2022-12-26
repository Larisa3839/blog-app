import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PrivateRouter from '../PrivateRoute'
import Header from '../Header'
import Main from '../Main'
import ArticleList from '../pages/ArticleList'
import SingleArticle from '../pages/SengleArticle'
import NewArticlePage from '../pages/NewArticlePage'
import EditArticle from '../pages/EditArticle'
import { SignInPage, SignUpPage, EditProfilePage } from '../pages/formsComponent'

import './App.css'

function App() {
  const auth = useSelector((state) => state.user.email)
  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route path="/articles" exact component={ArticleList} />
          <Route path="/articles/:slug" exact component={SingleArticle} />
          <PrivateRouter path="/articles/:slug/edit">
            <EditArticle />
          </PrivateRouter>
          <Route path="/sign-in">{auth ? <Redirect to="/" /> : <SignInPage />}</Route>
          <Route path="/sign-up" component={SignUpPage} />
          <PrivateRouter path="/profile">
            <EditProfilePage />
          </PrivateRouter>
          <PrivateRouter path="/new-article">
            <NewArticlePage />
          </PrivateRouter>
          <Route path="/" exact component={ArticleList} />
        </Switch>
      </Main>
    </>
  )
}

export default App
