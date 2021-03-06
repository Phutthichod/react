import React from "react";
import Table from "../Admin/TableManage";
import { MDBBtn, MDBIcon } from "mdbreact";
import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
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
        let rows = responseJson.map((item) => {
          item.detail = (
            <NavLink to={"/flower/"+item.user.id_user+"/detail"}>
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
      ["เช่าวันที่", "dateStart"],
      ["เช่าถึงวันที่", "dateEnd"],
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
