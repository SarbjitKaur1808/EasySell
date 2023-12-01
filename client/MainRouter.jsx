import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import Cart from './cart/Cart';


const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile} />
        <Route path="/cart" component={Cart}/>
        
      </Switch>
    </div>
  );
};

export default MainRouter;
