import React, { Component } from "react";
import { Collapse, Button } from "reactstrap";
import { MDBBtn } from "mdbreact";
class SidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  toggleDiv = () => {
    console.log("sss");
    this.setState({
      isOpen: !this.state.isOpen,
    });
    console.log("click " + this.state.isOpen);
  };
  render() {
    return (
      <div className="col-10 d-flex flex-column">
        <MDBBtn
          gradient="aqua"
          onClick={this.toggleDiv}
          className="d-flex align-content-center align-items-center"
        >
          <p className="mr-auto align-items-center">{this.props.children}</p>
          <p className="">{this.state.isOpen ? "-" : "+"}</p>
        </MDBBtn>
        <Collapse isOpen={this.state.isOpen}>{this.props.collapse}</Collapse>
      </div>
    );
  }
}
export default SidebarItem;
