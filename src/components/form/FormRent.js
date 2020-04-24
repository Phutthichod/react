import React, { useRef,useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import {Redirect} from 'react-router-dom'
import DressItem from "../rent/DressItem";
import { connect } from "react-redux";
import Action from "../../actions";

const mapDispatchToProps = (dispatch) => ({
  deleteAll: () => dispatch({ type: Action.DELETEALL }),
  delete: (data) => dispatch({ type: Action.DELETE, dress: data }),
});
const mapStateToProps = (state) => {
  console.log(state);
  return {
    cart: state.cart,
  };
};
const FormPage = (props) => {
  const [isSubmit,setIsSubmit] = useState(false)
  const fdate_recieve = useRef(null);
  const fdate_return = useRef(null);
  const user = JSON.parse(localStorage.getItem("member"));

  const saveDetail = async (rent, dress, number) =>
    await fetch("https://dress-api-gyhnw6hpja-uc.a.run.app/detailrents", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rent,
        dress,
        number,
      }),
    })
      .then(function (responseJSON) {
        if (responseJSON.ok) {
          return responseJSON.json();
        } else alert("ล้มเหลว");
      })
      .then(function (responseJSON) {
        return responseJSON;
      })
      .catch((error) => console.log("Authorization failed : " + error.message));

  const save = async () => {
    let date_time_rent = new Date().toISOString();
    let date_return = new Date(fdate_return.current.value).toISOString();
    let date_recieve = new Date(fdate_recieve.current.value).toISOString();
    let dress = props.cart.cart;
    console.log(
      JSON.stringify({
        date_time_rent,
        date_recieve,
        date_return,
        user,
      })
    );
    const insertRent = async (date_time_rent, date_recieve, date_return) =>
      await fetch("https://dress-api-gyhnw6hpja-uc.a.run.app/rents", {
        method: "post",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

    let newRent = await insertRent(date_time_rent, date_recieve, date_return);
    for (let i in dress) {
      let number = dress[i].number;
      dress[i].number = undefined;
      saveDetail(newRent, dress[i], number);
    }
    localStorage.removeItem('cart')
    alert("เช่าสำเร็จ");
    props.deleteAll()
    setIsSubmit(true)
  };
  const calTotal = ()=>{
    if(localStorage.getItem('cart')){
      let cart =  JSON.parse(localStorage.getItem('cart'))
      let total = 0
      for(let i in cart ){
          total+=cart[i].number*cart[i].price
      }
      return total
    }
    return 0
  }
  return (
    <MDBContainer>
      {isSubmit?<Redirect to="/" /> : ''}
      <MDBRow>
        <MDBCol md="12">
          <form>
            <p className="h4 text-center mb-4">การเช่า</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              วันที่มาเอา
            </label>
            <input
              ref={fdate_recieve}
              type="date"
              id="defaultFormLoginEmailEx"
              className="form-control"
            />
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              วันที่คืน
            </label>
            <input
              ref={fdate_return}
              type="date"
              id="defaultFormLoginEmailEx"
              className="form-control"
            />
            <div className="text-center mt-4 mb-4">
              <DressItem />
            </div>
            <div className="card ">
            <strong className="d-flex justify-content-end">{"ราคาทั้งหมด "+calTotal()+"  บาท"}</strong>
            </div>
              
            <div className="text-center mt-4 d-flex justify-content-end">
              <MDBBtn className="" color="indigo" onClick={save} type="button">
                จอง
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
