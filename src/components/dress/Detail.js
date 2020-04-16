import React,{Component, createRef} from 'react'
import {MDBBtn} from 'mdbreact'
import './style.css'
class Detail extends Component{
    constructor(props){
        super(props)
        this.setState={
            data :this.props.data
        }
        this.fnumber = createRef()
    }
    componentDidMount(){
        console.log(this.props)
    }
    add = ()=>{
        let data = this.props.data
        data.number = Number(this.fnumber.current.value)
        this.props.onAdd(data)
    }
    render(){
        return(
            <div className={this.props.className} height="70%">
                <span>{"ราคา "+this.props.data.price+" บาท"}</span>
                <span>{this.props.data.type.type}</span>
                <span>{"เนื้อผ้า :"+this.props.data.texture.texture}</span>
                <span>{"การออกแบบ :"+this.props.data.design.design}</span>
        <span>{this.props.data.color.color}</span>
                <input ref={this.fnumber} defaultValue="1" className="form-control col-6"  type="number" />
                <MDBBtn onClick={()=>this.add()} style={{width:"50%",height:"50%"}}  color="primary">จอง</MDBBtn>
            </div>
        )
    }
}
export default Detail