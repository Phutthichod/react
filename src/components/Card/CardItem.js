import React,{Component} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import {Link} from 'react-router-dom';
import './style.css'
class CardItem extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <MDBCard className="p-0 col-11">
                <MDBCardImage top width="100%" src={"http://localhost:8080/"+this.props.data.photo} alt="Card image cap" />
                <MDBCardBody>
                    <MDBCardTitle>{this.props.data.type.type}</MDBCardTitle>
                    <MDBCardText>{"ราคา "+this.props.data.price+" บาท"}</MDBCardText>
                    <Link to={"/dress/"+this.props.data.id_dress}><MDBBtn >Click</MDBBtn></Link >
                    {/* <Button>Button</Button> */}
                </MDBCardBody>
                </MDBCard>
            </div>
        )
    }
}
export default CardItem