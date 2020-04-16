import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './style.css'
const FormColor = () => {
return (
    <MDBContainer>
      <form>
        <div className="grey-text">
          <MDBInput label="ชื่อสี"  group type="text" validate error="wrong"
            success="right" />
          <MDBInput label="สี"  group type="text" validate />
        </div>
      </form>
    </MDBContainer>
);
};

export default FormColor;