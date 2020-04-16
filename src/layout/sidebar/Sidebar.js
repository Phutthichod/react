import React,{Component} from 'react';
import { Collapse,Button } from 'reactstrap';
import CollapseItem from "./CollapseItem"
import SidebarItem from './SidebarItem'
class Sidebar extends Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen:false,
            option : this.props.option
        }
    }
   
    render(){
        return(
            <div>
                {
                    this.state.option.map( (item,i) => <SidebarItem key={i} collapse={ item.collapse }>{item.name}</SidebarItem>)
                }
            </div>
            


        )
    }
}
export default Sidebar