import React from "react";
import Table from "../Admin/TableManage";
import { MDBBtn, MDBIcon } from "mdbreact";
import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
import ModalEdit from "../modal/ModalEditRent"
import ModalDelete from "../modal/ModalDelete"
export default function Rent() {
  const [data, setData] = useState([]);
  const [columns, setColumn] = useState([]);
  const member = JSON.parse(localStorage.getItem("member"));
  const id = member.id_user;
  const creatColumn = (data) => {
    let newData = [];
    newData = data.map((item) => ({ name: item[0], field: item[1] }));

    return newData;
  };
  const rents = () => {
    fetch(`http://localhost:8080/users/${id}/rents`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        let rows = responseJson.map((item,i) => {
          item.manage = (
            <div>
              <ModalEdit data={responseJson[i]} />
              <ModalDelete />
            </div>
          );
          item.detail = (
            <NavLink to={"/rent/"+item.user.id_user+"/detail"}>
              <MDBBtn color="info lighten-2">
                <MDBIcon fas icon="info" />
              </MDBBtn>
            </NavLink>
          );
          return item;
        });
        setData(responseJson);
      });
  };
  useEffect(() => {
    rents();
    let column = [
      ["จองวันที่", "date_time_rent"],
      ["มารับวันที่", "date_recieve"],
      ["คืนวันที่", "date_return"],
      ["รายละเอียด", "detail"],
    ];
    setColumn(creatColumn(column));
  }, [id]);
  return (
    <div className="container">
        <h3 >การจองทั้งหมด</h3>
      <Table columns={columns} rows={data} />
    </div>
  );
}
