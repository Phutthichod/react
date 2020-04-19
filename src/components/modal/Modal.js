import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Form from '../form/FormDress'
class ModalPage extends Component {
state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}
save = async (data) => {
  this.props.save(data);
  this.toggle();
};

render() {
  return (
    <MDBContainer className="d-flex flex-column">
      <MDBBtn  className={"ml-auto "} style={{width:"20%"}} onClick={this.toggle}>{this.props.title}</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>{this.props.title}</MDBModalHeader>
        <MDBModalBody >
          <Form save={this.save} />
        </MDBModalBody>
        
    </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;