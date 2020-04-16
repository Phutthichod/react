import React, { Fragment, useState } from "react";
import {
  MDBBtn,
  MDBIcon,
} from "mdbreact";
import swal from 'sweetalert'
import { Redirect } from "react-router-dom";
export default function ModalDelete(props) {
    const [isSubmit,setIsSubmit] = useState(false)
  const toggle = () => {
    swal({
        title: "Are you sure?",
        text: props.title,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
          fetch("http://localhost:8080/"+props.name+"/"+props.id,{
              method:'delete',
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              }
        
          })
          .then((response)=>(response.json()))
          .then((response)=>{
              console.log(response)
          })
          .catch((error)=>{
              console.log(error.message)
          })
        if (willDelete) {
            setIsSubmit(true)
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
        {
         isSubmit?   <Redirect to={"/admin/"+props.name.substring(0, props.name.length - 1)} />:''
        }
      <MDBBtn onClick={toggle} color="danger lighten-2">
        <MDBIcon fas icon="eraser" />
      </MDBBtn>
    </Fragment>
  );
}
