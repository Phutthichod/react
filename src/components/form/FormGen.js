import React, { Fragment,useRef,useEffect,useState } from "react";
import { MDBInput,MDBModalFooter,MDBBtn } from "mdbreact";
import {Redirect} from "react-router-dom" 

export default function FormGen(props) {
    const [isSubmit,setIsSubmit] = useState(false)
    console.log(props.name)
    const fname = useRef()
    useEffect(() => {
        console.log(props)
        fname.current.state.innerValue = props.data
        console.log(fname.current.state.innerValue)
    }, [props.name])
    const save = ()=>{
        
        let name = props.name
        console.log(fname.current.state.innerValue)
        const body = (name)=>{
            switch(name){
                case("type"):
                    return {
                        type: fname.current.state.innerValue
                  }
                case("design"):
                    return {
                        design: fname.current.state.innerValue
                }
                case("texture"):
                    return {
                        texture: fname.current.state.innerValue
                }
            }
        }
        console.log(JSON.stringify(body(name)))
        fetch("http://localhost:8080/"+name+"s",{
            method:props.method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                
              },
              body:JSON.stringify(body(name)),
                
        })
        .then((response)=>{
            
            return response.json()})
        .then(response=>{
            console.log(response)
            setIsSubmit(true)
        })
        .catch(error=>console.log(error.messes))
    }
  return (
    <Fragment>
        {isSubmit?
       <Redirect to={"/admin/"+props.name} /> :''
        
        }
      <div>
        <MDBInput ref={fname} valueDefault={props.data} label="ชื่อ" />
        
      </div>
      <MDBModalFooter>
        <MDBBtn color="primary" onClick={()=>{save()}}>
          Save change
        </MDBBtn>
        <MDBBtn color="warning">Close</MDBBtn>
      </MDBModalFooter>
    </Fragment>
  );
}
