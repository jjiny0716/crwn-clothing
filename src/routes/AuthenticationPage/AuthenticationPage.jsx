import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';

import "./AuthenticationPage.scss"

const AuthenticationPage = () => {
  return (
    <div className='authentication-container'>
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
};

export default AuthenticationPage;
