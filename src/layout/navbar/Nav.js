import React, { Component } from "react";
import { MDBNavbar } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {

render() {
  return (
    <Router>
      <MDBNavbar color="default-color" dark expand="md">
        
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage;