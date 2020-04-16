import React from 'react'
import Form from '../form/FormLogin'
import Nav from "../../layout/navbar/Nav"
export default function Login() {
    return (
        <div>
            <div className="mb-5">
               <Nav/> 
            </div>
            
            <Form/>
        </div>
    )
}
