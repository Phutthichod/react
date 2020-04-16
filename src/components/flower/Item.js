import React, { useRef } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const CardExample = (props) => {
    const number = useRef()

    const add = ()=>{
       /* let data = this.props.data
        data.number = Number(this.fnumber.current.value)
        this.props.onAdd(data)*/
    }
  return (
    <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
          waves />
        <MDBCardBody>
          <MDBCardTitle>ดอกไม้</MDBCardTitle>
          <MDBCardText>ราคา </MDBCardText>
          <input ref={number} className="form-control" defaultValue="1" type="number"/>
          <MDBBtn>เช่า</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardExample;