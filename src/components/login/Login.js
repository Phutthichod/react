import React from 'react'
import Form from '../form/FormLogin'
import Navbar from '../../layout/navbar/Navbar'
export default function Login() {
    return (
        <div>
            <div className="mb-5">
               <Navbar/> 
            </div>
            
            <Form/>
        </div>
    )
}
