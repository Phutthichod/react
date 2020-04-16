import React from "react";
import { MDBCard, MDBCardImage, MDBBtn, MDBIcon } from "mdbreact";
export default function CardItem(props) {
    const cart = JSON.parse(localStorage.getItem('cart'))
  return (
    <MDBCard className="d-flex flex-row justify-content-around">
      <MDBCardImage
        style={{
          width: "100px",
          margin: "4px",
        }}
        className="img-fluid"
        src={"http://localhost:8080/"+props.data.photo}
        waves
      />
      <div className="ml-1 mt-3  d-flex flex-column align-items-start">
          <span >
            {props.data.type.type}
         </span><br/>
         <span className="mb-2 align-items-start">
             {"จำนวน "+props.data.number+" ชุด"}
         </span>
      </div>
      
      <MDBBtn onClick={()=>props.onDel()} color="indigo lighten-2">
        <MDBIcon icon="times" />
      </MDBBtn>
    </MDBCard>
  );
}
