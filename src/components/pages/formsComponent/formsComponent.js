/* eslint-disable react/display-name */
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { Alert } from 'antd'

import { setSuccessRequest } from '../../../store/userSlice'

const formsComponent = (FormComponent, fetchFunction) => (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  //const errorRequest = useSelector((state) => state.user.isErrorUserRequest)
  const isSuccess = useSelector((state) => state.user.userRequestSuccess)

  useEffect(() => {
    console.log('succsses')
    if (isSuccess) history.push('/')
    dispatch(setSuccessRequest())
  }, [isSuccess, dispatch])

  const handleFormSubmit = (data) => {
    dispatch(fetchFunction(data))
  }
  //const errMessage = errorRequest ? <FormComponent {...props} handleFormSubmit={handleFormSubmit} /> : null
  return <FormComponent {...props} handleFormSubmit={handleFormSubmit} />
}

export default formsComponent
