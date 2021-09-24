import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";

function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
    const {user} = userLogin;
  const handleLogoutAction = () => {
  };

  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="md" sticky="top">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{" "}
            Album
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-auto">
              {!user && (<LinkContainer to="login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>)}
              {user && (<Nav.Link onClick={handleLogoutAction}>
                {user.name}
              </Nav.Link>)}
              {user && (<Nav.Link onClick={handleLogoutAction}>
                Logout
                <ExitToAppIcon />
              </Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;