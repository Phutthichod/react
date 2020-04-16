import React, { Fragment, useState,useRef,useEffect } from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
export default function ModalEditGen(props) {
    console.log(props)
   const fdate_recieve = useRef(null);
  const fdate_return = useRef(null);
  const [modal, setModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("member"));
  const toggle = () => {
    console.log("click");
    setModal(!modal);
  };
  const update = async () => {
    let date_time_rent = props.data.date_time_rent
    let date_return = new Date(fdate_return.current.value).toISOString();
    let date_recieve = new Date(fdate_recieve.current.value).toISOString();
    let id_rent = props.data.id_rent
    console.log(
      JSON.stringify({
        date_time_rent,
        date_recieve,
        date_return,
        user,
      })
    );
  
    const insertRent = async (id_rent,date_time_rent, date_recieve, date_return) =>
      await fetch("http://localhost:8080/rents", {
        method: "put",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_rent,
          date_time_rent,
          date_recieve,
          date_return,
          user,
        }),
      })
        .then(function (response) {
          // console.log(response.json());
          // if (response.ok) {
          //   alert("สร้าง user สำเร็จ");
          // } else alert("สร้าง user ล้มเหลว");
          return response.json();
        })
        .then(function (responseJSON) {
          console.log(responseJSON);
          return responseJSON;
        })
        .catch((error) =>
          console.log("Authorization failed : " + error.message)
        );
        let newRent = await insertRent(id_rent,date_time_rent, date_recieve, date_return);
    }
    useEffect(() => {

        // fdate_recieve.current.state.innerValue = props.data.date_recieve
        // fdate_return.current.state.innerValue = props.data.date_return
        console.log(props.data.date_return.substring(0, 10))
      }, [user]);
  return (
    <Fragment>
      <div className="d-flex justify-content-end">
        <MDBBtn onClick={toggle} className="ml-auto" color={props.color}>
          <MDBIcon fas icon="edit" />
        </MDBBtn>
      </div>
        {
        props.data?
        
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>{props.name}</MDBModalHeader>
        <MDBModalBody>
          <p className="h4 text-center mb-4">การจอง</p>
          <label htmlFor="defaultFormLoginEmailEx"  className="grey-text">
            วันที่มาเอา
          </label>
          <input
            ref={fdate_recieve}
            type="date"
            id="defaultFormLoginEmailEx"
            className="form-control"
            defaultValue={props.data.date_recieve.substring(0, 10)}
          />
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            วันที่คืน
          </label>
          <input
            ref={fdate_return}
            type="date"
            id="defaultFormLoginEmailEx"
            className="form-control"
            defaultValue={props.data.date_return.substring(0, 10)}
          />
          <MDBModalFooter>
        <MDBBtn color="primary" onClick={()=>{update()}}>
          Save change
        </MDBBtn>
        <MDBBtn color="warning">Close</MDBBtn>
      </MDBModalFooter>
        </MDBModalBody>
        </MDBModal>
        :
        ''}
      
    </Fragment>
  );
  }