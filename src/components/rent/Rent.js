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
              <ModalEdit onUpdate={update} data={responseJson[i]} />
              <ModalDelete onDelete={del} title={"ลบการจอง Id "+item.id_rent} id={item.id_rent} name="rents" />
            </div>
          );
          item.detail = (
            <NavLink to={"/rent/"+item.id_rent+"/detail"}>
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
  const del = (id)=>{
    fetch("http://localhost:8080/rents/"+id,{
      method:'delete',

  })
  .then((response)=>(response.json()))
  .then((response)=>{
      console.log(response)
     
  })
  .catch((error)=>{
      console.log(error.message)
      rents()
  })
  }
  const update = async (date_recieve,date_return,date_time_rent,id_rent,user) => {
    console.log("sdasd")
    console.log(
      JSON.stringify({
        date_time_rent,
        date_recieve,
        date_return,
        user,
      })
    );
  
    const insertRent = async (id_rent,date_time_rent, date_recieve, date_return) =>
      await fetch("http://localhost:8080/rents", {
        method: "put",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_rent,
          date_time_rent,
          date_recieve,
          date_return,
          user,
        }),
      })
        .then(function (response) {
          // console.log(response.json());
          // if (response.ok) {
          //   alert("สร้าง user สำเร็จ");
          // } else alert("สร้าง user ล้มเหลว");
          return response.json();
        })
        .then(function (responseJSON) {
          console.log(responseJSON);
          rents()
          return responseJSON;
          
        })
        .catch((error) =>
          console.log("Authorization failed : " + error.message)
        );
        let newRent = await insertRent(id_rent,date_time_rent, date_recieve, date_return);
    }
 
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
        <h3 >การเช่าทั้งหมด</h3>
      <Table columns={columns} rows={data} />
    </div>
  );
}
