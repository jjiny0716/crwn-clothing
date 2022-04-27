import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';

import {AuthenticationContainer} from "./AuthenticationPage.styles.jsx"

const AuthenticationPage = () => {
  return (
    <AuthenticationContainer>
      <SignInForm/>
      <SignUpForm/>
    </AuthenticationContainer>
  );
};

export default AuthenticationPage;
