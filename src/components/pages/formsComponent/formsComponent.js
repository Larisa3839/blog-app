/* eslint-disable react/display-name */
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setSuccessRequest } from '../../../store/userSlice'

const formsComponent = (FormComponent, fetchFunction) => (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isSuccess = useSelector((state) => state.user.userRequestSuccess)

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSuccessRequest())
      history.push('/')
    }
  }, [isSuccess, dispatch, history])

  const handleFormSubmit = (data) => {
    dispatch(fetchFunction(data))
  }

  return <FormComponent {...props} handleFormSubmit={handleFormSubmit} />
}

export default formsComponent
