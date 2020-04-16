import React, { useState, useRef } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Redirect, Link } from "react-router-dom";

const FormPage = (props) => {
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const fusername = useRef();
  const fpassword = useRef();
  const loginSubmit = () => {
    const username = fusername.current.value;
    const password = fpassword.current.value;
    console.log(
      JSON.stringify({
        username,
        password,
      })
    );
    let check = async () =>
      await fetch("http://localhost:8080/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then(function (responseJSON) {
          if (responseJSON.ok) {
            return responseJSON.json();
          } else alert("login ล้มเหลว");
        })
        .then(function (response) {
          if (response.id_user != null) {
            alert("login สำเร็จ");
            localStorage.setItem("member", JSON.stringify(response));
            if (response.role == "แอดมิน") setIsAdmin(true);
            else setIsUser(true);
          } else alert("login ล้มเหลว");
          return response;
        })
        .catch((error) =>
          console.log("Authorization failed : " + error.message)
        );
    check();
  };
  return (
    <MDBContainer>
      {isAdmin ? (
        <div>
          <Redirect to="/admin/dresse" />
        </div>
      ) : (
        ""
      )}
      {isUser ? (
        <div>
          <Redirect to="/dress" />
        </div>
      ) : (
        ""
      )}
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Sign in</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your email
            </label>
            <input
              ref={fusername}
              type="text"
              id="defaultFormLoginEmailEx"
              className="form-control"
            />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
              Your password
            </label>
            <input
              ref={fpassword}
              type="password"
              id="defaultFormLoginPasswordEx"
              className="form-control"
            />
            {/* <Link to="/register"><small>register</small></Link> */}
            <div className="text-center mt-4">
              <MDBBtn color="indigo" onClick={loginSubmit} type="button">
                Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
const login = () => {
  localStorage.setItem("member", "pinto");
};

export default FormPage;
