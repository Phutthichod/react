import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./layout/navbar/Navbar";
import MainDress from "./layout/main/MainDress";
import MainAdmin from "./layout/main/MainAdmin";
import NavbarAdmin from "./layout/navbar/NavbarAdmin";
import DressDetail from "./components/dress/DressDetail";
import NotFoundPage from "./components/PageNOtFound";
import Rent from "./components/rent/Rent";
import Detail from "./components/rent/RentDetail";
import Cart from "./components/rent/RentInCart";
import Folwer from "./components/flower";
import Content from "./Content";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {checkLogin() ? (
          login()
        ) : (
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/admin/:name" component={Admin} />
            <Route exact path="/dress" component={Index} />
            <Route exact path="/rent" component={rent} />
            <Route exact path="/rent/:id/detail" component={detail} />
            <Route path="/login" component={login} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={cart} />
            <Route path="/flower" component={flower} />
            <Route path="/dress/:id" component={dressDetail} />
            <Route component={NotFoundPage} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
}
const cart = () => (
  <div>
    <div className="Navbar">
      <Navbar />
    </div>
    <div className="Main mt-3">
      <Cart />
    </div>
  </div>
);
const flower = () => (
  <div>
    <div className="Navbar">
      <Navbar />
    </div>
    <div className="Main mt-3">
      <Folwer />
    </div>
  </div>
);
const checkLogin = () => {
  if (localStorage.getItem("member") === null) {
    return true;
  } else {
    return false;
  }
};
const login = () => <Login />;
const rent = () => (
  <div>
    <div className="Navbar">
      <Navbar />
    </div>
    <div className="Main mt-3">
      <Rent />
    </div>
  </div>
);
const detail = () => (
  <div>
    <div className="Navbar">
      <Navbar />
    </div>
    <div className="Main mt-3">
      <Detail />
    </div>
  </div>
);
const Index = () => {
  return (
    <div>
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="Main mt-3">
        <MainDress />
      </div>
    </div>
  );
};

const dressDetail = (p) => (
  <div>
    <div className="Navbar">
      <Navbar />
    </div>
    <div className="Main mt-3">
      <DressDetail id={p} />
    </div>
  </div>
);
const Admin = (param) => (
  <div>
    <div className="Navbar">
      <NavbarAdmin />
    </div>
    <div className="Main mt-5">
      <MainAdmin name={param} />
    </div>
  </div>
);
export default App;
