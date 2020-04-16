import React, { useState, useEffect, Component } from "react";
import { MDBContainer, MDBModalFooter, MDBInput, MDBBtn } from "mdbreact";
import "./style.css";
import { Redirect } from "react-router-dom";
import Select from "./Dropdown";
import { render, wait } from "@testing-library/react";

class FormDress extends Component {
  constructor(props) {
    super(props);
    let pic
    if(props.data){
      pic = "http://localhost:8080/photos/" + props.data.photo ;
    }else{
      pic = ""
    }
    this.state = {
      isSuccess: false,
      color: [],
      type: [],
      design: [],
      texture: [],
      pic:pic
    }
    this.init();
    this.price = React.createRef();
    this.pic = React.createRef();
    this.design = React.createRef();
    this.color = React.createRef();
    this.texture = React.createRef();
    this.type = React.createRef();
    this.amount = React.createRef();
  }
  componentWillUpdate() {
    if (this.props.data) {
      // this.color.current.value = "4"
      // console.log(this.color.current.value)
      let data = this.props.data;
      this.price.current.state.innerValue = data.price;
      this.design.current.value = data.design.idDesign;
      this.color.current.value = data.color.idColor;
      this.texture.current.value = data.texture.idTexture;
      this.type.current.value = data.type.id_type;
      this.amount.current.state.innerValue = data.amount;
    }
  }

  setColor = () => {
    let that = this;
    fetch("http://localhost:8080/colors")
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        console.log(jsonData);
        that.setState({
          color: jsonData,
        });
      });
  };
  setType = () => {
    let that = this;
    fetch("http://localhost:8080/types")
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        console.log(jsonData);
        that.setState({
          type: jsonData,
        });
      });
  };
  setTexture = () => {
    let that = this;
    fetch("http://localhost:8080/textures")
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        console.log(jsonData);
        that.setState({
          texture: jsonData,
        });
      });
  };
  getData = (name, id) => {
    const p = fetch(`http://localhost:8080/${name}/${id}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        return jsonData;
      });
    return p;
  };

  setDesign = () => {
    let that = this;
    fetch("http://localhost:8080/designs")
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        that.setState({
          design: jsonData,
        });
      });
  };
  init = () => {
    this.setColor();
    this.setType();
    this.setTexture();
    this.setDesign();
  };
  getBase64 = (file) => {
    let that = this;
    var reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function () {
      const base64 = btoa(reader.result);
      const base64Tosrc = "data:image/png;base64," + base64;
      that.setState({
        pic: base64Tosrc,
      });
      console.log(base64Tosrc);
      // console.log("state"+that.state.pic)
    };
    reader.onerror = function () {
      console.log("there are some problems");
    };
  };
  update = async () => {
    let color = await this.getData("colors", this.color.current.value);
    let texture = await this.getData("textures", this.texture.current.value);
    let type = await this.getData("types", this.type.current.value);
    let design = await this.getData("designs", this.design.current.value);
    let amount = Number(this.amount.current.state.innerValue);
    let price = Number(this.price.current.state.innerValue);
    let pic = this.state.pic;
    let id_dress = this.props.data.id_dress;
    console.log(
      JSON.stringify({
        id_dress: id_dress,
        color: color,
        texture: texture,
        type: type,
        design: design,
        price: price,
        photo: pic,
        amount: amount,
      })
    );
    let update = async () =>
      await fetch("http://localhost:8080/dresses", {
        method: "put",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_dress: id_dress,
          color: color,
          texture: texture,
          type: type,
          design: design,
          price: price,
          photo: pic,
          amount: amount,
        }),
      })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then((response) => {
          this.setState({
            isSuccess: true,
          });
          console.log(response+"setState");
        })
        .catch((error) =>
          console.log("Authorization failed : " + error.message)
        );
    update();
  };
  save = async () => {
    // console.log(this.color.current.value);

    let color = await this.getData("colors", this.color.current.value);
    let texture = await this.getData("textures", this.texture.current.value);
    let type = await this.getData("types", this.type.current.value);
    let design = await this.getData("designs", this.design.current.value);
    let amount = Number(this.amount.current.state.innerValue);
    let price = Number(this.price.current.state.innerValue);
    let pic = this.state.pic;
    // console.log(this.price)
    // console.log(pic)
    let insert = async () =>
      await fetch("http://localhost:8080/dresses", {
        method: "post",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: color,
          texture: texture,
          type: type,
          design: design,
          price: price,
          photo: pic,
          amount: amount,
        }),
      })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then((response) => {
          this.setState({
            isSuccess: true,
          });
          console.log(response+"setState");
        })
        .catch((error) =>
          console.log("Authorization failed : " + error.message)
        );
    insert();
    console.log(
      JSON.stringify({
        photo: pic,
      })
    );
  };
  render() {
    return (
      <MDBContainer>
        {this.state.isSuccess ? <Redirect to="/admin/dresse" /> : ""}

        <form>
          <div className="form-group">
            <Select
              ref={this.color}
              name="color"
              id="idColor"
              data={this.state.color}
            />
          </div>
          <div className="form-group">
            <Select
              ref={this.texture}
              name="texture"
              id="idTexture"
              data={this.state.texture}
            />
          </div>
          <div className="form-group">
            <Select
              ref={this.design}
              name="design"
              id="idDesign"
              data={this.state.design}
            />
          </div>
          <div className="form-group">
            <Select
              ref={this.type}
              name="type"
              id="id_type"
              data={this.state.type}
            />
          </div>
          <div className="grey-text">
            <MDBInput
              ref={this.amount}
              label="จำนวน"
              group
              type="number"
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              ref={this.price}
              label="ราคา"
              group
              type="number"
              validate
              error="wrong"
              success="right"
            />
            <div className="form-group">
              <input
                ref={this.pic}
                type="file"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={() => this.getBase64(this.pic.current.files[0])}
              />
            </div>
            <img
              style={{ width: "70px", height: "80px" }}
              src={this.state.pic}
            />
          </div>
          <MDBModalFooter>
            {/* <MDBBtn color="secondary" onClick={() => this.save()}> */}
            {/* Close */}
            {/* </MDBBtn> */}
            {this.props.data ? (
              <MDBBtn color="primary" onClick={() => this.update()}>
                Save changes
              </MDBBtn>
            ) : (
              <MDBBtn color="primary" onClick={() => this.save()}>
                Save
              </MDBBtn>
            )}
            <MDBBtn color="warning">Close</MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBContainer>
    );
  }
}

export default FormDress;
