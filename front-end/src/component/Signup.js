import "../css/style.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "../css/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [ userCreate, setUserCreate ] = useState({username: "", password: "", organization: "", role: ""});
  const [confirmPw, setConfirmPw] = useState("")
  const [show, setShow] = useState(false)
  const [failed, setFailed] = useState("")

  const inputChange = async (field, value) => {
    let shallowCopy = {...userCreate}
    shallowCopy[field] = value;
    await setUserCreate(shallowCopy)
  };

  const createAccount = async (event) => {
    event.preventDefault();
    try {
      if (!userCreate.password) {
        throw new Error("Password is missing");
      }
      else if(userCreate.password !== confirmPw){
        throw new Error("Password is mismatched");
      }
      const hashedPassword = await bcrypt.hash(userCreate.password, 10);

      if (hashedPassword){
        try {
          const res = await axios.post("http://localhost:8080/signup", {
            username: userCreate.username,
            password: hashedPassword,
            organization: userCreate.organization,
            role: userCreate.role,
          });
          setShow(true)
        } catch (error) {
          alert("Signup failed");
          console.error(error);
        }
      }
    } catch (error) {
      setFailed(error.message)
    }
  };

  const roleChoice = ["lsp_user","payload_user"];


  return (
    <div className="background d-flex p-3 align-items-center ">
      <div className="col">
        <h1 className="text-center loginPageHeader">Sign Up!</h1>
        {failed && <h1 className="text-center failed loginPageHeader">{failed}</h1>}
        <form
          onSubmit={(e) => {createAccount(e);}}
        >
          <div className="row p-2 justify-content-center">
            <input
              className="w-25 rounded mx-3 text-center"
              type="text"
              onChange={(e) => inputChange("organization", e.target.value)}
              name="organization"
              placeholder="Organization"
              required
            />
            <input
              className="w-25 rounded mx-3 text-center"
              type="text"
              name="username"
              onChange={(e) => inputChange("username", e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div className="row p-2 justify-content-center">
            <input
              className="w-25 rounded mx-3 text-center"
              type="password"
              name="password"
              onChange={(e) => inputChange("password", e.target.value)}
              placeholder="Password"
              required
            />
            <input
              className="w-25 rounded mx-3 text-center"
              type="password"
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="row justify-content-center my-2">
            <div className="radiogroup">
              <div className="my-2 text-center">
                <label className="text-white justify-center">
                  <input
                    name="role"
                    type="radio"
                    onChange={(e) => inputChange("role", e.target.value)}
                    className="form-check-input"
                    value={roleChoice[0]}
                  />
                  I am a Launch Service Provider
                </label>
              </div>
              <div className="my-2  text-center">
                <label className="text-white justify-center">
                  <input
                    name="role"
                    type="radio"
                    className="form-check-input"
                    onChange={(e)=> inputChange("role", e.target.value)}
                    value={roleChoice[1]}
                  />
                  I am an Organizational Payload User
                </label>
              </div>

              <div className="my-2 text-center">
                <label className="text-white justify-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    required
                  />
                  I understand the risks of falsifying information and accept
                  those risks under penalty of law
                </label>
              </div>
            </div>
          </div>

          <div className="row my-3 d-flex justify-content-center">
            <input type="submit" className="btn btn-secondary w-25"></input>
          </div>
        </form>

        <h1 className="text-center loginPageHeader">Already a user?</h1>
          <div className="row my-3 d-flex justify-content-center">
            <button
              className="btn btn-secondary w-25"
              onClick={() => navigate('/')}
            >
              Login!
            </button>
          </div>

      </div>

      <Modal show={show} onHide={() => navigate("/")} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Account Created!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <p>
          You have successfully created your account, please click the button 
          below to take you to the login page
        </p>
        </Modal.Body>
        
        <Modal.Footer className="modalForm">
          <Button
            className="addPayload"
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Login!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Signup;