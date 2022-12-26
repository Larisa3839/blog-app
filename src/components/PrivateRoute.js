import { useLocation, Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRouter = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.user.email)
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={() => (auth ? children : <Redirect to={{ pathname: '/sign-in', state: { from: location } }} />)}
    />
  )
}

export default PrivateRouter
