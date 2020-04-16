import React, { useRef, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Redirect } from 'react-router-dom'
import CartItem from "../flower/CartItem";
import { connect } from "react-redux";
import Action from "../../actions";

const mapDispatchToProps = (dispatch) => ({
    deleteAll: () => dispatch({ type: Action.DELETE_ALL_FLOWER }),
    delete: (data) => dispatch({ type: Action.DELETE_FLOWER, flower: data }),
});
const mapStateToProps = (state) => {
    console.log(state);
    return {
        flower: state.flower,
    };
};
const FormPage = (props) => {
    const [isSubmit, setIsSubmit] = useState(false)
    const fdateStart = useRef(null);
    const fdateEnd = useRef(null);
    const user = JSON.parse(localStorage.getItem("member"));

    const saveDetail = async (order, flower, number) =>
        await fetch("http://localhost:8080/detailrents", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order,
                flower,
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
    const calTotal = () => {
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            let total = 0
            for (let i in cart) {
                total += cart[i].number * cart[i].price
            }
            return total
        }
        return 0
    }

    const save = async () => {
        let dateStart = new Date().getTime();
        let dateEnd = null
        let totalprice = calTotal()
        let flower = props.flower.flower;
        const insertFlower = async (dateStart,dateEnd,totalprice) =>
            await fetch("http://localhost:8080/rents", {
                method: "post",

                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dateStart,
                    dateEnd,
                    totalprice,
                    nameCustomer:"ปิ่นโต",
                    status:"ยังไม่คืน",
                    owner:user.name
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (responseJSON) {
                    console.log(responseJSON);
                    return responseJSON;
                })
                .catch((error) =>
                    console.log("Authorization failed : " + error.message)
                );

        let newOrder = await insertFlower(dateStart,dateEnd,totalprice);
        for (let i in flower) {
            let amount = flower[i].amount;
            flower[i].amount = undefined;
            saveDetail(newOrder, flower[i], amount);
        }
        localStorage.removeItem('flower')
        alert("เช่าสำเร็จ");
        props.deleteAll()
        setIsSubmit(true)
    };

    return (
        <MDBContainer>
            {isSubmit ? <Redirect to="/" /> : ''}
            <MDBRow>
                <MDBCol md="12">
                    <form>
                        <p className="h4 text-center mb-4">การเช่า</p>
                        <div className="text-center mt-4 mb-4">
                            <CartItem />
                        </div>
                        <div className="card ">
                            <strong className="d-flex justify-content-end">{"ราคาทั้งหมด " + calTotal() + "  บาท"}</strong>
                        </div>

                        <div className="text-center mt-4 d-flex justify-content-end">
                            <MDBBtn className="" color="indigo" onClick={save} type="button">
                                เช่า
              </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
