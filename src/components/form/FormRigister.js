
import React,{useRef,useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {Redirect} from 'react-router-dom'
const FormPage = () => {
  const [isSubmit,setIsSubmit] = useState(false)
  const fusername = useRef(null)
  const fsurname = useRef(null)
  const ftitle = useRef(null)
  const fname = useRef(null)
  const fphone = useRef(null)
  const fpassword = useRef(null)
  const frole = "ลูกค้า"
  const femail = useRef(null)
  const save = ()=>{
    
    const username = fusername.current.state.innerValue
    const surname = fsurname.current.state.innerValue
    const title = ftitle.current.value
    const phone = fphone.current.state.innerValue
    const name = fname.current.state.innerValue
    const password = fpassword.current.state.innerValue
    const role = frole
    const email = femail.current.state.innerValue

    let insert = async  ()=>await  fetch("https://dress-api-gyhnw6hpja-uc.a.run.app/users", {
      method: "post",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username,
          surname,
          title,
          phone,
          name,
          password,
          role,
          email
       }),
    })
      .then(function (response) {
        console.log(response);
        if(response.ok){
          alert("สร้าง user สำเร็จ")
          setIsSubmit(true)
        }
        else alert("สร้าง user ล้มเหลว")
        return response;
      }).catch(error => console.log('Authorization failed : ' + error.message));
      insert()
      
  }
  return (
    
    <MDBContainer>
      {isSubmit? <Redirect to="/login" />:''}
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                <MDBInput
                    ref={fusername}
                    label="ชื่อผู้ใช้"
                    icon="profile"
                    group
                    type="text"
                    validate
                  />
                  <select ref={ftitle} className="browser-default custom-select">
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                  <MDBInput
                  ref={fname}
                    label="ชื่อ"
                    icon="profile"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    ref={fsurname}
                    label="นามสกุล"
                    icon="profile"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                  ref={fphone}
                    label="เบอร์มือถือ"
                    icon="phone"
                    group
                    type="number"
                    validate
                  />
                  <MDBInput
                  ref={femail}
                    label="อีเมล์"
                    icon="mail"
                    group
                    type="email"
                    validate
                  />
                  <MDBInput
                  ref={fpassword}
                    label="รหัสผ่าน"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn onClick={()=>save()} color="cyan" type="button">
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;