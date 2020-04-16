import React, { Fragment, useState } from "react";
import {
  MDBBtn,
  MDBIcon,
} from "mdbreact";
import swal from 'sweetalert'
export default function ModalDelete(props) {
  const toggle = () => {
    swal({
        title: "Are you sure?",
        text: props.title,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
          fetch("http://localhost:8080/dresses/"+props.id,{method:'delete'
        ,headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },})
          .then((response)=>(response.json()))
          .then((response)=>(response))
          .catch((error)=>{
              console.log(error.message)
          })
        if (willDelete) {
          swal(props.title+" ถูกลบแล้ว", {
            icon: "success",
          });
        } else {
          swal("ไม่ถูกลบ");
        }
      });
  };
  return (
    <Fragment>
      <MDBBtn onClick={toggle} color="danger lighten-2">
        <MDBIcon fas icon="eraser" />
      </MDBBtn>
    </Fragment>
  );
}