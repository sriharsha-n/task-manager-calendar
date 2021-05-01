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
import axios from "../axios"
import {ReactSession} from 'react-client-session';
import { useHistory } from 'react-router-dom'


export function LoginForm(props) {
  ReactSession.setStoreType("localStorage");

  const history = useHistory();

  const { switchToSignup } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backendError, setBackendError] = useState("");

  const handleSubmit = () => {
    setBackendError("");
    axios.post("/api/login/",{
      email: email,
      password: password,
    })
    .then((res) => {
        console.log(res.data);
        ReactSession.set("name", res.data.name);
        history.push("/tasks");
    })
    .catch((err) => {
      setBackendError(err.response.data.message);
    })

  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmit}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <p style={{color:"red"}}>{backendError}</p>
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
