import React, { Fragment, useState } from "react";
import {
  MDBBtn,
  MDBIcon,
} from "mdbreact";
import swal from 'sweetalert'
import { Redirect } from "react-router-dom";
export default function ModalDelete(props) {
    let link = "/rent"
    if(props.name!="rents")
        link = "/admin/"+props.name.substring(0, props.name.length - 1)
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
        
         
        if (willDelete) {
            setIsSubmit(true)
          swal(props.title+" ถูกลบแล้ว", {
            icon: "success",
          });
          console.log(props.onDelete(props.id,props.name))
        } else {
          swal("ไม่ถูกลบ");
        }
      });
      
  };
  return (
    <Fragment>
        {
        //  isSubmit?   <Redirect to={link} />:''
        }
      <MDBBtn onClick={toggle} color="danger lighten-2">
        <MDBIcon fas icon="eraser" />
      </MDBBtn>
    </Fragment>
  );
}
