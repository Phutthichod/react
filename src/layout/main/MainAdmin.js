import React, { Component } from "react";
import { MDBIcon, MDBBtn } from "mdbreact";
import SideBar from "../sidebar/SidebarAdmin";
import Body from "../../components/Admin/TableManage";
import ModalPage from "../../components/modal/Modal";
import ModalEdit from "../../components/modal/ModalEdit";
import ModalDelete from "../../components/modal/ModalDelete";
import ModalGen from "../../components/modal/ModalEditGen"
import "./main.css";
class MainAdminColor extends Component {
  constructor(props) {
    super(props);
    let name = this.props.name.match.params.name;
    let init = this.init(name);
    // console.log("sss"+column[0].name)
    console.log("set");
    this.state = {
      name: name,
      columns: init.columns,
      rows: [],
      modolInsert: init.modolInsert,
      modolEdit: [],
    };
    this.fetchData(name);
  }
  componentWillReceiveProps(nextProps) {
    let name = nextProps.name.match.params.name;
    console.log(name);

    let init = this.init(name);
    this.setState({
      name: name,
      columns: init.columns,
      rows: [],
      modolInsert: init.modolInsert,
      modolEdit: init.modolEdit,
    });
    this.fetchData(name);
    console.log("column" + this.state.columns);
  }
  modalManage = (data) => {
    let name = this.props.name.match.params.name;
    console.log(data);
    let modolEdit = "";
    let modolDelete = "";
    switch (name) {
      case "dresse":
        modolEdit = <ModalEdit data={data} />;
        modolDelete = <ModalDelete  name="dresses"  id={data.id_dress} title={data.type.type} />;
        break;
      case "color":
        modolDelete = <ModalDelete name="colors"  id={data.idColor} title={data.color} />; 
        break;
      case "design":
        modolEdit =  <ModalGen method="put" data={data.design} name="design"  />
        modolDelete = <ModalDelete name="designs"  id={data.idDesign} title={data.design} />; 
        break;
      case "texture":
        modolEdit =  <ModalGen method="put" data={data.texture} name="texture"  />
        modolDelete = <ModalDelete name="textures"  id={data.idTexture} title={data.texture} />; 
        break;
      case "type":
        modolEdit =  <ModalGen method="put" data={data.type} name="type"  />
        modolDelete = <ModalDelete name="types"  id={data.id_type} title={data.type} />; 
        break;
      default:
    }
    // return modolEdit
    // console.log("re");
    return (
      <div>
        {modolEdit}
        {modolDelete}
      </div>
    );
  };
  init(name) {
    let columns = [];
    let modolInsert = "";
    switch (name) {
      case "dresse":
        modolInsert = <ModalPage icon="" color="red" title={name} />;

        columns = [
          ["การออกแบบ", "design"],
          ["สี", "color"],
          ["เนื้อผ้า", "texture"],
          ["ชนิด", "type"],
          ["ราคา", "price"],
          ["รูป", "photo"],
        ];
        break;
      case "color":
        columns = [
          ["ชื่อ", "color"],
          ["รหัสสี", "code"],
        ];
        break;
      case "design":
        columns = [["ชื่อ", "design"]];
        modolInsert = <ModalGen  method="post" data='' color="success lighten-2" name="design"  />
        break;
      case "texture":
        columns = [["ชื่อ", "texture"]];
        modolInsert = <ModalGen method="post" data='' color="success lighten-2" name="texture"  />
        break;
      case "type":
        columns = [["ชื่อ", "type"]];
        modolInsert = <ModalGen method="post" data='' color="success lighten-2" name="type"  />
        break;
      default:
    }
    console.log(columns);
    columns = this.creatColumn(columns);

    return { columns, modolInsert };
  }
  fetchData(name) {
    let that = this;
    fetch(`http://localhost:8080/${name}s`)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let newData = jsonData;
        for (let i in newData) {
          let data = newData[i];
          for (let j in newData[i]) {
            if (typeof newData[i][j] == "object") {
              // console.log(j)
              newData[i][j] = newData[i][j][j];
            }
          }
          newData[i].manage = that.modalManage(data);
        }

        fetch(`http://localhost:8080/${name}s`)
          .then(function (response) {
            return response.json();
          })
          .then(function (jsonData) {
            for (let i in jsonData) {
                newData[i].photo =<img style={{width:"50px"}} src={"http://localhost:8080/photos/"+jsonData[i].photo}/> 
              newData[i].manage = that.modalManage(jsonData[i]);
            }
            // console.log(jsonData);
            that.setState({ rows: newData });
          });
      });
  }
  creatColumn(data) {
    let newData = [];
    newData = data.map((item) => ({ name: item[0], field: item[1] }));

    return newData;
  }
  render() {
    return (
      <div className="mainColor">
        <div className="sidebar mt-2 ">
          <SideBar />
        </div>
        <div className="body ">
          {this.state.modolInsert}
          <Body columns={this.state.columns} rows={this.state.rows} />
        </div>
      </div>
    );
  }
}
export default MainAdminColor;
