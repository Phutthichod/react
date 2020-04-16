import React, { Component } from "react";
import CardItem from "./CardItem";
import "./style.css";
import Action from '../../actions'
import {connect} from 'react-redux'
class CardShow extends Component {
    constructor(props){
        super(props)
        this.state={
          value:[],
          data:[]
        }
    }
  render() {
    
    return (
      <div className="card-show">
        {
            this.props.dress.dress.map((item, i) => <CardItem  key={i} data={item} />)
          }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    dress: state.dressState,
  };
};

export default connect(mapStateToProps, null)(CardShow);