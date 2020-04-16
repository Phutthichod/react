import React, { Component, Fragment } from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import Form from "../form/FormDress";
class ModalPage extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <Fragment>
        <MDBBtn onClick={this.toggle} color="warning lighten-2">
          <MDBIcon fas icon="edit" />
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>
            {this.props.title}
          </MDBModalHeader>
          <MDBModalBody>
            <Form data={this.props.data}/>
          </MDBModalBody>
        </MDBModal>
      </Fragment>
    );
  }
}

export default ModalPage;
