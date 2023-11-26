import React, { useContext, useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogout, getCurrentUser, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

const CustomNavbar = (props) => {
  const userContextData = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(
    function () {
      setLogin(isLoggedIn());
      setUser(getCurrentUser());
    },
    [login]
  );

  const toggle = () => setIsOpen(!isOpen);

  function logout() {
    doLogout(() => {
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false,
      });
      navigate("/");
    });
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="">
        <NavbarBrand tag={ReactLink} to="/">
          My Blog
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="me-auto">
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem tag={ReactLink} to="/">
                  Contact Us
                </DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar className="ms-auto">
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/user-info">
                    Profile
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            )}
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
