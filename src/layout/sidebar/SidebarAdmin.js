import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBCol,
} from "mdbreact";
import "./style.css";
class SidebarAdmin extends Component {
  loop = () => {
    let p = [{ name: "ชุดแต่งงาน", link: "/admin/dresses" },
          { name: "ชนิด", link: "/admin/types" },
          { name:"เนื้อผ้า",link:"/admin/textures"},
          { name: "สี", link: "/admin/colors" },
    { name: "การออกแบบ", link: "/admin/designs" }];
    for (let i = 0; i < p.length; i++) {
      p[i] = (
        <NavLink
          key={i}
          style={{ width: "200px" }}
          className="btn btn-primary"
          activeClassName="active"
          to={p[i].link}
        >
         {p[i].name}
        </NavLink>
      );
    }
    return p;
  };
  render() {
    return (
      <MDBRow center className="position-fixed">
        <MDBCol xl="12" md="12">
          <MDBBtnGroup vertical>{this.loop().map((item) => item)}</MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    );
  }
}
export default SidebarAdmin;
