import React, { useState } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
const Profile = ()=>{
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    return(
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="nav-item dropdown d-none d-xl-inline-flex user-dropdown profile">
            <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
        >
            <a className="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <img className="img-xs rounded-circle ml-2 img-profile" src="" alt="Profile image"></img> <span className="font-weight-normal"></span>
            </a>
        </DropdownToggle>
            
            <DropdownMenu className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                <div className="dropdown-header text-center">
                <img className="img-md rounded-circle img-profile" src="" alt="Profile image"></img>
                <p className="mb-1 mt-3"></p>

                </div>
                <a className="dropdown-item" href="/profile/me"><i className="dropdown-item-icon icon-user text-primary"></i> My Profile <sup><span className="badge badge-pill badge-danger">1</span></sup></a>
                <a href="/logout" className="dropdown-item"><i className="dropdown-item-icon icon-power text-primary"></i>Sign Out</a>
            </DropdownMenu>
        </Dropdown>
    )
}
export default Profile