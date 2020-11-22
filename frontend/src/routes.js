import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Context } from './Context/AuthContext';

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/Error";
import ProductSearch from "./pages/ProductSearch";
import Painel from "./pages/Painel";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Departamento from "./pages/Departamento";
import Loading from "./components/Loading";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { OrderNF } from "./pages/OrderNF";


function CustomRoute({ isPrivate, isLoggedIn, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  if (loading) {
    return <Loading />
  }

  if (isLoggedIn && authenticated === true) {
    return <Redirect to="/dashboard" />
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

function Routes() {
  return (
    <Switch>
      <CustomRoute path="/" exact component={Home} />
      <CustomRoute path="/product/:slug" component={ProductDetail} />
      <CustomRoute path="/search" component={ProductSearch} />
      <CustomRoute path="/departamentos/:name" component={Departamento} />
      <CustomRoute path="/cart/:id?" component={Cart} />
      <CustomRoute path="/about" component={About} />
      <CustomRoute path="/checkout" component={Checkout} />
      <CustomRoute path="/order-success" component={OrderSuccess} />
      <CustomRoute path="/order-notafiscal" component={OrderNF} />
      <CustomRoute isLoggedIn path="/login" component={Login} />
      <CustomRoute isLoggedIn path="/register" component={Register} />
      <CustomRoute isLoggedIn path="/forgotpassword" component={ForgotPassword} />
      <CustomRoute isLoggedIn path="/resetpassword/:token" component={ResetPassword} />
      <CustomRoute isPrivate path="/dashboard" component={Painel} />
      <CustomRoute path="*" component={ErrorPage} />
    </Switch>
  );
}

export default Routes;
