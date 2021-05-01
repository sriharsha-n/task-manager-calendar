import React, { useContext,useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from '../axios'

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [backendError, setBackendError] = useState("");


  const handleSubmit = () => {
    axios.post("/api/create-user/",{
      name: fullname,
      email: email.toLowerCase(),
      password: password,
    })
    .then((res) => {
      console.log(res);
      setBackendError("Registered Successfuly.");
    })
    .catch((err) => {
      console.log(err);
      setBackendError(err.response.data.message);
    })
    setFullname("");
    setPassword("");
    setCpassword("");
    setEmail("");
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)}  />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <p style={{color:"red"}}>{backendError}</p>
      <SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
