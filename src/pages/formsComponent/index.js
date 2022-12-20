import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import EditProfale from '../../components/EditProfale'
import { fetchCreateUser, fetchLoginUser, fetchUpdateUser } from '../../store/userSlice'

import formsComponent from './formsComponent'

const SignInPage = formsComponent(SignIn, fetchLoginUser)
const SignUpPage = formsComponent(SignUp, fetchCreateUser)
const EditProfilePage = formsComponent(EditProfale, fetchUpdateUser)

export { SignInPage, SignUpPage, EditProfilePage }
