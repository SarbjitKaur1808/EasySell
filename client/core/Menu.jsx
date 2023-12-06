import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import cart from "./../cart/cart-helper";

const isActive = (history, path) => ({
  color: history.location.pathname === path ? " #ff4081" : "black",
  fontWeight: history.location.pathname === path ? "bold" : "400", // Adjusted text weight
  marginRight: 3, // Add right margin for spacing between menu items
  padding: "0px 8px", // Add padding to create separation between menu items
});

const Menu = withRouter(({ history }) => (
  <AppBar
    position="static"
    color="inherit"
    sx={{
      boxShadow: "none",
      background: "transparent",
      borderBottom: "2px solid  #ff4081",
    }}
  >
    <Toolbar>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={"/assets/images/WebLogo.png"} height={50} alt="Logo" />
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, ml: 2, color: "#ff4081", fontWeight: "bold" }}
            >
              EASYSELL
            </Typography>
          </Link>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              borderRight: "2px solid  #ff4081",
            }}
          >
            <IconButton aria-label="Home" style={isActive(history, "/")}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Link
            to="/shops/all"
            style={{
              textDecoration: "none",
              borderRight: "2px solid  #ff4081",
            }}
          >
            <Typography style={isActive(history, "/shops/all")}>
              All Shops
            </Typography>
          </Link>
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              borderRight: "2px solid  #ff4081",
            }}
          >
            <IconButton aria-label="Cart" style={isActive(history, "/cart")}>
              <Badge badgeContent={cart.itemTotal()} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          {/* Authenticated user links */}
          {auth.isAuthenticated() && (
            <>
              <Link
                to={`/seller/shops`}
                style={{
                  textDecoration: "none",
                  borderRight: "2px solid  #ff4081",
                }}
              >
                <Typography style={isActive(history, "/seller/shops")}>
                  SELL
                </Typography>
              </Link>
              <Link
                to={`/user/${auth.isAuthenticated().user._id}`}
                style={{
                  textDecoration: "none",
                  borderRight: "2px solid  #ff4081",
                }}
              >
                <Typography
                  style={isActive(
                    history,
                    `/user/${auth.isAuthenticated().user._id}`
                  )}
                >
                  My Profile
                </Typography>
              </Link>
              <Typography
                onClick={() => auth.clearJWT(() => history.push("/"))}
                style={{ cursor: "pointer", color: "black", marginRight: 2 }}
              >
                Sign out
              </Typography>
            </>
          )}
          {/* Non-authenticated user links */}
          {!auth.isAuthenticated() && (
            <>
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  borderRight: "2px solid  #ff4081",
                }}
              >
                <Typography style={isActive(history, "/signup")}>
                  Sign up
                </Typography>
              </Link>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Typography style={isActive(history, "/signin")}>
                  Sign In
                </Typography>
              </Link>
            </>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
));

export default Menu;
