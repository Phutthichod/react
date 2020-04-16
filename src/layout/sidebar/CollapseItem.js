import React, { Component } from "react";
import Action from '../../actions'
import {connect} from 'react-redux'
const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch({ type: Action.UPDATE, data: data}),

});
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    dress: state.dressState,
  };
};
class CollapseItem extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      data:[],
      selectedOption: -1,
      value:this.props.dress.value
    };
    this.data(props.name);
    this.updateState(-1)
  }
  data = async (name) => {
    let that = this;
    fetch("http://localhost:8080/" + name + "s")
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        // console.log(jsonData);
        that.setState({
          data: jsonData,
        });
      });
  };
   getData = async (value, name) => {
    let setFetch = null;
    let data = null
    if (value != -1) setFetch = await fetch("http://localhost:8080/dresses/" + name+"/"+value)
          .then((response) => response.json())
              .then((responseJSON) => {
              return responseJSON;
              });
    else{
        setFetch = await fetch("http://localhost:8080/dresses")
        .then((response) => response.json())
      .then((responseJSON) => {
          data = responseJSON
          // console.log("sss"+data)
        return responseJSON;
      });
    } 
    return setFetch
  }
   dataAll = async (value) => {
    let colors = await this.getData(value.color, "color");
    let designs = await this.getData(value.design, "design");
    let types = await this.getData(value.type, "type");
    let textures = await this.getData(value.texture, "texture");
    // console.log(colors)
    let data = await colors.filter((item)=>{
        return types.find((item2)=>item2.id_dress == item.id_dress) != undefined
    }).filter((item)=>{
      return designs.find((item2)=>item2.id_dress == item.id_dress) != undefined
    }).filter((item)=>{
      return textures.find((item2)=>item2.id_dress == item.id_dress) != undefined
    })
    // console.log(colors)
      return data
  };

  updateState = (id)=>{
    let value = this.props.dress.value
    value[this.props.name] = id
    let updateData = this.dataAll(value)
    updateData.then((response)=>{
      console.log(response)
      this.props.update({value:value,dress:response})
    })
  }
  setChecked = (e) => {
    let that = this
    console.log(e.target.checked);
    if(this.state.selectedOption !== Number(e.target.value)){
      that.setState({ selectedOption: Number(e.target.value) });
      this.updateState(Number(e.target.value))
      // this.setState({value})
      // console.log(this.props.dress.value)
      
      
      
      // this.dataById(this.props.name,Number(e.target.value))



    }
    
  };
  setInit = () => {
    let that = this
    if(this.state.selectedOption !== -1){
      // this.dataAll();
      that.setState({ selectedOption: -1 });
      this.updateState(Number(-1))
    }
      
  };
  render() {
    // this.props.update(this.state.value)
    return (
      <div className="ml-5">
        <div className="justify-content-end custom-control custom-checkbox">
          <input
            value="-1"
            // name={"radio"+this.props.name}
            type="radio"
            checked={this.state.selectedOption === -1}
            onChange={() => {
              this.setInit();
            }}
            className="custom-control-input"
            id={"defaultChecked"+this.props.name}
          />
          <label className="custom-control-label" htmlFor={"defaultChecked"+this.props.name}>
            ทั้งหมด
          </label>
        </div>
        {this.state.data.map((item, i) => (
          <div
            key={i}
            className="justify-content-end custom-control custom-checkbox"
          >
            <input
              value={item[this.props.id]}
              type="radio"
              checked={this.state.selectedOption === item[this.props.id]}
              onChange={(e) => this.setChecked(e)}
              className="custom-control-input"
              id={"defaultChecked" + this.props.name + i}
            />
            <label
              className="custom-control-label"
              htmlFor={"defaultChecked" + this.props.name + i}
            >
              {item[this.props.name]}
            </label>
          </div>
        ))}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CollapseItem);
