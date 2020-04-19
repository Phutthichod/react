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
        let body
        if(props.method=="post"){
             body = (name)=>{
                switch(name){
                    case("types"):
                        return {
                            type: fname.current.state.innerValue
                      }
                    case("designs"):
                        return {
                            design: fname.current.state.innerValue
                    }
                    case("textures"):
                        return {
                            texture: fname.current.state.innerValue
                    }
                    case("colors"):
                        return {
                          color: fname.current.state.innerValue,
                    }
                }
            }

        }else{
            body = (name)=>{
                switch(name){
                    case("types"):
                        return {
                            type: fname.current.state.innerValue,
                            id_type:props.id
                      }
                    case("designs"):
                        return {
                            design: fname.current.state.innerValue,
                            idDesign:props.id
                    }
                    case("textures"):
                        return {
                            texture: fname.current.state.innerValue,
                            idTexture:props.id
                    }
                    case("colors"):
                        return {
                          color: fname.current.state.innerValue,
                            idColor:props.id
                    }
                }
            }
        }
        
        // console.log(JSON.stringify(body(name))+props.method)
        props.update(name,props.method,body)
        props.toggle()
    }
  return (
    <Fragment>
       
      <div>
        <MDBInput ref={fname} valueDefault={props.data} label="ชื่อ" />
        
      </div>
      <MDBModalFooter>
        <MDBBtn color="primary" onClick={()=>{save()}}>
          Save change
        </MDBBtn>
        <MDBBtn color="warning" onClick={()=>props.toggle()}>Close</MDBBtn>
      </MDBModalFooter>
    </Fragment>
  );
}
