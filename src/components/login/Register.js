import React from 'react'
import Form from '../form/FormRigister'
import Navbar from '../../layout/navbar/Navbar'
export default function Register() {
    return (
        <div>
            <div className="mb-5">
               <Navbar/> 
            </div>
            
            <Form/>
        </div>
    )
}
