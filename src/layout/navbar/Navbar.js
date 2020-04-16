import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBBtn,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
import "./style.css";
class Navbar extends Component {
   member = ()=>{
     let fmember
    if(localStorage.getItem('member'))
         fmember = JSON.parse(localStorage.getItem('member'))
      return fmember
  }
  state = {
    isOpen: false,
  };
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <div>
        <MDBNavbar color="default-color" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">WEDDING</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem className="nav-item d-flex align-items-center mr-2">
                <NavLink
                  className="nav-color d-flex align-items-center p-2"
                  exact
                  activeClassName="is-active"
                  to="/"
                >
                  หน้าแรก
                </NavLink>
              </MDBNavItem>
              <MDBNavItem className="d-flex align-items-center mr-2">
                <NavLink
                  className="nav-color d-flex align-items-center"
                  activeClassName="is-active"
                  to="/dress"
                >
                  ชุดแต่งงาน
                </NavLink>
              </MDBNavItem>
              <MDBNavItem className="d-flex align-items-center mr-2">
                <NavLink
                  className="nav-color d-flex align-items-center"
                  activeClassName="is-active"
                  to="/photographer"
                >
                  ช่างภาพ
                </NavLink>
              </MDBNavItem>
              <MDBNavItem className="d-flex align-items-center mr-2">
                <NavLink
                  className="nav-color d-flex align-items-center"
                  activeClassName="is-active"
                  to="/flower"
                >
                  ดอกไม้
                </NavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem className="d-flex align-items-center mr-2">
                <NavLink
                  className="nav-color d-flex align-items-center mr-2"
                  activeClassName="is-active"
                  to="/cartFlower"
                >
                  <MDBIcon fas icon="fan" />
                </NavLink>
              </MDBNavItem>
              <MDBNavItem className="d-flex align-items-center mr-2">
                <NavLink
                  className="nav-color d-flex align-items-center"
                  activeClassName="is-active"
                  to="/cart"
                >
                  <MDBIcon fas icon="tshirt" />
                </NavLink>
              </MDBNavItem>
              <MDBNavItem className="d-flex align-items-center mr-2">
                <NavLink
                  className="nav-color d-flex align-items-center"
                  activeClassName="is-active"
                  to="/rent"
                >
                  การเช่า
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right className="dropdown-default">
                    <MDBIcon
                      className="d-flex justify-content-center"
                      icon="user"
                    />
                    {this.member()?
                    <MDBDropdownItem>{this.member().name+"  "+this.member().surname}</MDBDropdownItem>
                    :
                    
                    ''
                    }
                    
                    <MDBDropdownItem
                      className="d-flex justify-content-center"
                      href="/login"
                    >
                      ออกจากระบบ
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}
export default Navbar;
