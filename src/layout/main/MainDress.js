import React,{Component} from 'react'
import Sidebar from '../sidebar/Sidebar'
import CardShow from '../../components/Card/CardShow'
import { Collapse,Button } from 'reactstrap';
import CollapseItem from "../sidebar/CollapseItem"
import './main.css'
class MainDress extends Component{
    constructor(props){
        super(props)
        this.state={
            option : [
                    {
                        name:"สี",
                        collapse: <CollapseItem id="idColor" name="color" /> 
                    },
                    {
                        name:"ออกแบบ",
                        collapse:  <CollapseItem id="idDesign" name="design"/> 
                    },
                    {
                        name:"ชนิด",
                        collapse:  <CollapseItem id="id_type" name="type"/> 
                    },
                    {
                        name:"เนื้อผ้า",
                        collapse:  <CollapseItem id="idTexture" name="texture"/> 
                    }
                    ],
                    // data:[]
        }
        // console.log("data")
    }
    
    
    render(){
        console.log("ppp"+this.state.data)
        return(
            <div className="main">
                <div  className="sidebar">
                    <Sidebar option={this.state.option}/>
                </div>
                <div className="body">
                    {/* {this.state.data[0].price} */}
                    <CardShow />
                    {/* <Pin/> */}
                </div>
                
            </div>
        )
    }
}
export default MainDress