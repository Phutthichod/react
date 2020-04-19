import React, { Component } from "react";
import { MDBIcon, MDBBtn } from "mdbreact";
import SideBar from "../sidebar/SidebarAdmin";
import Body from "../../components/Admin/TableManage";
import ModalPage from "../../components/modal/Modal";
import ModalEdit from "../../components/modal/ModalEdit";
import ModalDelete from "../../components/modal/ModalDelete";
import ModalGen from "../../components/modal/ModalEditGen";
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
  insertDress =  (data) =>{
       fetch("http://localhost:8080/dresses", {
        method: "post",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then((response) => {
          this.fetchData("dresses");
          console.log(response+"setState");
        })
        .catch((error) =>
          console.log("Authorization failed : " + error.message)
        );}
  updateDress = (data) => {
    fetch("http://localhost:8080/dresses", {
      method: "put",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        this.fetchData("dresses")
        console.log(response + "setState");
      })
      .catch((error) => console.log("Authorization failed : " + error.message));
  };
  modalManage = (data) => {
    let name = this.props.name.match.params.name;
    console.log(data);
    let modolEdit = "";
    let modolDelete = "";
    switch (name) {
      case "dresses":
        modolEdit = <ModalEdit update={this.updateDress} data={data} />;
        modolDelete = (
          <ModalDelete
            onDelete={this.del}
            name="dresses"
            id={data.id_dress}
            title={data.type.type}
          />
        );
        break;
      case "colors":
        modolEdit = (
          <ModalGen
            update={this.update}
            method="put"
            id={data.idColor}
            data={data.color}
            name="colors"
          />
        );
        modolDelete = (
          <ModalDelete
            onDelete={this.del}
            name="colors"
            id={data.idColor}
            title={data.color}
          />
        );
        break;
      case "designs":
        modolEdit = (
          <ModalGen
            update={this.update}
            method="put"
            id={data.idDesign}
            data={data.design}
            name="designs"
          />
        );
        modolDelete = (
          <ModalDelete
            onDelete={this.del}
            name="designs"
            id={data.idDesign}
            title={data.design}
          />
        );
        break;
      case "textures":
        modolEdit = (
          <ModalGen
            update={this.update}
            method="put"
            id={data.idTexture}
            data={data.texture}
            name="textures"
          />
        );
        modolDelete = (
          <ModalDelete
            onDelete={this.del}
            name="textures"
            id={data.idTexture}
            title={data.texture}
          />
        );
        break;
      case "types":
        modolEdit = (
          <ModalGen
            update={this.update}
            method="put"
            data={data.type}
            name="types"
          />
        );
        modolDelete = (
          <ModalDelete
            onDelete={this.del}
            name="types"
            id={data.id_type}
            title={data.type}
          />
        );
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
  update = (name, method, body) => {
    fetch("http://localhost:8080/" + name, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body(name)),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        this.fetchData(name);
      })
      .catch((error) => console.log(error.messes));
  };
  del = (id, name) => {
    console.log("http://localhost:8080/" + name + "/" + id);
    fetch("http://localhost:8080/" + name + "/" + id, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
        this.fetchData(name);
      });
  };
  init(name) {
    let columns = [];
    let modolInsert = "";
    switch (name) {
      case "dresses":
        modolInsert = <ModalPage icon="" save={this.insertDress} color="red" title={name} />;

        columns = [
          ["การออกแบบ", "design"],
          ["สี", "color"],
          ["เนื้อผ้า", "texture"],
          ["ชนิด", "type"],
          ["ราคา", "price"],
          ["รูป", "photo"],
        ];
        break;
      case "colors":
        columns = [["ชื่อ", "color"]];
        modolInsert = (
          <ModalGen
            method="post"
            update={this.update}
            data=""
            color="success lighten-2"
            name="colors"
          />
        );
        break;
      case "designs":
        columns = [["ชื่อ", "design"]];
        modolInsert = (
          <ModalGen
            method="post"
            update={this.update}
            data=""
            color="success lighten-2"
            name="designs"
          />
        );
        break;
      case "textures":
        columns = [["ชื่อ", "texture"]];
        modolInsert = (
          <ModalGen
            method="post"
            update={this.update}
            data=""
            color="success lighten-2"
            name="textures"
          />
        );
        break;
      case "types":
        columns = [["ชื่อ", "type"]];
        modolInsert = (
          <ModalGen
            method="post"
            update={this.update}
            data=""
            color="success lighten-2"
            name="types"
          />
        );
        break;
      default:
    }
    console.log(columns);
    columns = this.creatColumn(columns);

    return { columns, modolInsert };
  }
  fetchData(name) {
    let that = this;
    fetch(`http://localhost:8080/${name}`)
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

        fetch(`http://localhost:8080/${name}`)
          .then(function (response) {
            return response.json();
          })
          .then(function (jsonData) {
            for (let i in jsonData) {
              newData[i].photo = (
                <img
                  style={{ width: "50px" }}
                  src={"http://localhost:8080/photos/" + jsonData[i].photo}
                />
              );
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
