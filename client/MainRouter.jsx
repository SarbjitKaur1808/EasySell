import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import NewShop from "./shop/NewShop";
import Shops from "./shop/Shops";
import MyShops from "./shop/MyShops";
import Shop from "./shop/Shop";
import EditShop from "./shop/EditShop";
import NewProduct from "./product/NewProduct";
import EditProduct from "./product/EditProduct";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import ShopOrders from "./order/ShopOrders";
import Order from "./order/Order";
const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />

        <Route path="/cart" component={Cart} />

        <Route path="/product/:productId" component={Product} />

        <Route path="/order/:orderId" component={Order} />
        <PrivateRoute
          path="/seller/orders/:shop/:shopId"
          component={ShopOrders}
        />

        {/* SHOPS */}
        <Route path="/shops/all" component={Shops} />
        <Route path="/shops/:shopId" component={Shop} />
        <PrivateRoute path="/seller/shops" component={MyShops} />
        <PrivateRoute path="/seller/shop/new" component={NewShop} />
        <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop} />
        <PrivateRoute
          path="/seller/:shopId/products/new"
          component={NewProduct}
        />
        <PrivateRoute
          path="/seller/:shopId/:productId/edit"
          component={EditProduct}
        />
      </Switch>
    </div>
  );
};

export default MainRouter;
