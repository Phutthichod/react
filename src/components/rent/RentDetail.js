import React from "react";
import Table from "../Admin/TableManage";
import { useState, useEffect } from "react";

export default function RentDetail(props) {
  const [data, setData] = useState([]);
  const [columns, setColums] = useState([]);
  const member = JSON.parse(localStorage.getItem("member"));
  console.log(props)
  const id = member.id_user;
  const rents = () => {
    // {

    fetch("http://localhost:8080/rent/" + props.id.match.params.id + "/detailrents")
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        console.log(jsonData)
        let detail = [];
        let rows = jsonData.map((item2) => {
            item2.total = item2.number * item2.dress.price;
            item2.price = item2.dress.price
            item2.type = item2.dress.type.type
            detail.push(item2);
            return item2;
          });
            
        
        setData(detail)
        // setData(rows)
        console.log(detail);
      });
  };
  useEffect(() => {
    rents();
    let columns = [
      ["ชนิดชุด", "type"],
      ["จำนวน", "number"],
      ["ราคาตัวละ", "price"],
      ["ราคาทั้งหมด", "total"],
    ];
    columns = creatColumn(columns);
    setColums(columns)
  }, [id]);
  const creatColumn = (data) => {
    let newData = [];
    newData = data.map((item) => ({ name: item[0], field: item[1] }));
    return newData;
  };

  return (
    <div className="container">
      <h3>รายละเอียดการจอง</h3>
      <Table columns={columns} rows={data}/>
    </div>
  );
}
