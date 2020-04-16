import React,{Component} from 'react'
import { BrowserRouter as Router,NavLink } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle,MDBBtn ,MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import './style.css' 
class NavbarMain extends Component{
    render(){
        return(
            <div className="navbar-admin">
                <MDBNavbar className="fixed-top navbar-expand-lg aqua-gradient " light expand="md">
                    <MDBNavbarBrand ><strong style={{color:"white"}}>WEDDING</strong></MDBNavbarBrand>
                    <MDBNavbarNav className="" left>
                        <MDBNavItem>
                            <NavLink  className="nav-color d-flex align-items-center p-2"   exact activeClassName="is-active"  to="">จัดการชุดแต่งงาน</NavLink>
                            {/* <NavLink to="/components/">จัดการชุดแต่งงาน</NavLink> */}
                        </MDBNavItem>
                        <MDBNavItem>
                            <NavLink  className="nav-color d-flex align-items-center p-2"   exact activeClassName="is-active"  to="">การเช่า</NavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu right className="dropdown-default">
                            <MDBIcon className="d-flex justify-content-center"  icon="user" />
                            <MDBDropdownItem >พุทธิโชติ ทองจีนสังข์</MDBDropdownItem>
                            <MDBDropdownItem className="d-flex justify-content-center" href="#!">ออกจากระบบ</MDBDropdownItem>
                        </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbar>
            </div>
        )
    }
}
export default NavbarMain