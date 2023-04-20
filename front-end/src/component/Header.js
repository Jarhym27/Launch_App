import "../css/Header.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { RocketTakeoffFill } from "react-bootstrap-icons";
import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { RocketInfo } from "../App";
import NotificationsBadge from "./NotificationsBadge";

const Header = () => {

  const { userLogin, setUserLogin } = useContext(RocketInfo);
  let profilePath = '/';
  const navigate = useNavigate();

  if (userLogin.role === 'lsp_user') {
    profilePath = '/lspprofile'
  } else {
    profilePath = '/payloadprofile'
  }

  const logout = () => {
    document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    fetch("http://localhost:8080/logout", {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: userLogin.username }),
    })
      .then((res) => {
        console.log(res)
        setUserLogin('')
        navigate('/')

      })
  }

  return (
    <>
      <Navbar id="headerc" bg="dark" variant="dark" sticky="top">
      {userLogin.role === 'payload_user' &&
      <>
        <Link id="headerLink" to={'/home'}>
        <Navbar.Brand>
          <RocketTakeoffFill className="navbar-logo" color='white' size={50} />
        </Navbar.Brand>
        </Link>
        <Col className="me-auto">
          <h1 className='title' onClick={() => navigate('/home')}>L-Uber</h1>
        </Col>
      </>
      }
      {userLogin.role ==='lsp_user' &&
          <>
            <Link id="headerLink" to={'/lspprofile'}>
              <Navbar.Brand>
                <RocketTakeoffFill className="navbar-logo" color='white' size={50} />
              </Navbar.Brand>
            </Link>
            <Col className="me-auto">
              <h1 className='title' onClick={() => navigate('/lspprofile')}>L-Uber</h1>
            </Col>
          </>
      }
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text>
            {userLogin.role === 'payload_user' && <Link className="headerLink" to={'/home'}>Home</Link>}
            {userLogin.role === 'lsp_user' && <Link className="headerLink" to={'/LSPHome'}>Home</Link>}
          </Navbar.Text>
          <Navbar.Text>
            <Link className="headerLink" to={profilePath}>Profile</Link>
          </Navbar.Text>
          <Navbar.Text>
            {userLogin.role ==='lsp_user' && <Link className="headerLink" to={'/metrics'}>My Metrics</Link>}
          </Navbar.Text>
          <Navbar.Text>
            <Link className="headerLink" to={'/messages'}>Messages</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link className="headerLink" to={'/aboutus'}>About Us</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link className="headerLink" to={'/vehicles'}>Launch Vehicles</Link>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {userLogin &&
          <>
          <div className='notif-badge'>
            <NotificationsBadge  />
          </div>
              <Navbar.Text className='signed-in-text'>
                Signed in as:  <span id='user-name'>{userLogin.username}</span>
            </Navbar.Text>
          </>
          }

          <Button className='logout-btn' onClick={() => logout()}
            >Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header;
