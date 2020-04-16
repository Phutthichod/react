import React from 'react'
import Form from '../form/FormRigister'
import Nav from "../../layout/navbar/Nav"
export default function Register() {
    return (
        <div>
            <div className="mb-5">
               <Nav/> 
            </div>
            
            <Form/>
        </div>
    )
}
