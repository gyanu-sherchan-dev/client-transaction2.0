import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const Header = ({ registerbg }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleOnLogout = () => {
    // remove the user from the sessionStorage
    sessionStorage.removeItem("user");
    // redirect user to the login page
    // navigate("/");
  };

  return (
    <Navbar variant={registerbg ? "light" : "dark"} expand="md">
      <Container className="header">
        <Navbar.Brand href="#home">
          FT2.0
          {/* <img src="../../../assets/logo1.png" alt="" /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <div className=" nav-link text-info">
                  Welcome back !! {user?.name}
                </div>
                {/* <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link> */}
                <Link to="/" className="nav-link" onClick={handleOnLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
