import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";


export const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header >
      <Navbar  variant="dark" expand="md"  collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand">Emart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className='justify-content-between' id="basic-navbar-nav">
         
            <Nav className='justify-content-between' >
              <LinkContainer to="/cart">
                <Nav.Link className="mx-3">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (

                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userslist"><NavDropdown.Item >Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productslist"><NavDropdown.Item >
                    Products
                  </NavDropdown.Item></LinkContainer>
                  <LinkContainer to="/admin/orderslist"><NavDropdown.Item >
                    Orders
                  </NavDropdown.Item></LinkContainer>
                </NavDropdown>

              )}
            </Nav>
            <SearchBox/>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
