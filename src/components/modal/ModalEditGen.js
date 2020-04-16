import React, { Fragment ,useState} from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import Form from "../form/FormGen";
export default function ModalEditGen(props) {
    const [modal,setModal] = useState(false)
   const toggle = () => {
       console.log("click")
       setModal(!modal)
  };
  return (
    <Fragment>
      <div className="">
        <MDBBtn onClick={toggle} className="" color={props.color}>
          <MDBIcon fas icon="edit" />
        </MDBBtn>
      </div>

      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>{props.name}</MDBModalHeader>
        <MDBModalBody>
          <Form method={props.method} data={props.data}  name={props.name} />
        </MDBModalBody>
      </MDBModal>
    </Fragment>
  );
}
