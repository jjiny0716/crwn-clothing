import { useState } from "react";

import FormInput from "./FormInput";
import Button from "./Button";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../util/firebase/firebase";

import { SignUpContainer } from "./SignUpForm.styles.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.error("User creation encountered an error", error);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleOnChange} name="displayName" value={displayName} />
        <FormInput label="Email" type="email" required onChange={handleOnChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleOnChange} name="password" value={password} />
        <FormInput label="Confirm Password" type="password" required onChange={handleOnChange} name="confirmPassword" value={confirmPassword} />
        <Button type="submit">SIGN UP</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
