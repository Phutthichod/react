import React, { Component, Fragment } from "react";
import { MDBBtn } from "mdbreact";
import Image from "./Image";
import { connect } from "react-redux";
import Action from "../../actions";
import Detail from "./Detail";
class DressDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    // const { id } = this.props.match.params
    this.fetchData(this.props.id.match.params.id);
  }
  fetchData(id) {
    let that = this;
    fetch(`http://localhost:8080/dresses/${id}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        that.setState({ data: jsonData });
        console.log(that.state.data.length)
        console.log(jsonData);
      });
  }
  render() {
    return (
     <Fragment>
        {this.state.data.length != 0 ? (
                <div className="detail">
                    <Image
                    className="mr-5"
                    src={"http://localhost:8080/" + this.state.data.photo}
                    />
                    <Detail
                    onAdd={(data) => this.props.add(data)}
                    data={this.state.data}
                    className="detail-grid"
                    />
                </div>
                ) : (
                ""
                )}
     </Fragment>
       

    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  add: (data) => dispatch({ type: Action.ADD, dress: data }),
});
export default connect(null, mapDispatchToProps)(DressDetail);
