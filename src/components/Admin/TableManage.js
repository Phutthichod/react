import React, { Component } from "react";
import { MDBDataTable, MDBBtn, MDBIcon } from "mdbreact";
class BodyColor extends Component {
  constructor(props) {
    super(props);
    let columns = this.setColumn(props.columns)
    let rows = props.rows
    this.state = {
      data: {
        columns: columns,
        rows: rows,
        page:{
          dress:0,
          color:0,
          type:0,
          texture:0,
          design:0
        }
      },
    };
  }
  setColumn(data){
    let columns = data.map((item) => ({
      label: item.name,
      field: item.field,
      sort: "asc",
    }));
    columns.push({
      label: "จัดการ",
      field: "manage",
      sort: "asc",
    })
    return columns
  }
  setRow(data){
    let rows = data.map((item) => {
      item.manage = (
        <div>
          <MDBBtn  color="warning lighten-2">
            <MDBIcon fas icon="edit" />
          </MDBBtn>
          <MDBBtn color="danger lighten-2">
            <MDBIcon fas icon="eraser" />
          </MDBBtn>
        </div>
      );
      return item;
    });
    return rows
  }
  componentWillReceiveProps(nextProps){
    console.log("sss")
    let columns = this.setColumn(nextProps.columns)
    let rows = nextProps.rows
    this.setState({
      data: {
        columns: columns,
        rows: rows,
      },
    })
  }
  render() {
    return (
      <div className="">
        <MDBDataTable striped bordered hover data={this.state.data} />
      </div>
    );
  }
}
export default BodyColor;
