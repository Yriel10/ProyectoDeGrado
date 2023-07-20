import React from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav
      variant="pills"
      style={{
        width: "200px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <NavItem>
        <NavLink href="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/contact">Contact</NavLink>
      </NavItem>
    </Nav>
  );
};

export default Sidebar;