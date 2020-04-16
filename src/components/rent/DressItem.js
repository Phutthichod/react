import React from "react";
import CardItem from "./CardItem";
import { connect } from "react-redux";
import Action from "../../actions";
import swal from 'sweetalert';

const mapDispatchToProps = (dispatch) => ({
  delete: (data) => dispatch({ type: Action.DELETE, dress: data }),
});
const mapStateToProps = (state) => {
  console.log(state)
  return{
  cart: state.cart,
}};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function DressItem(props) {
  const alert = (item) => {
    swal({
      title: item.type.type,
      text: item.design.design,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        props.delete(item)
        swal("ลบเรียบร้อย", {
          icon: "success",
        });
      } else {
        swal("ไม่ลบ");
      }
    });
  };
  return (
    <div className="item-grid">
      {
        props.cart.cart.map((item, i) => (
            <CardItem onDel={()=>alert(item)} key={i} data={item} />
          ))
}
    </div>
  );
});
