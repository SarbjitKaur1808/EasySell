import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import cart from "./../cart/cart-helper";

const styles = (theme) => ({
  navBar: {
    boxShadow: "none",
    background: "transparent",
    borderBottom: "2px solid #ff4081",
  },
  link: {
    textDecoration: "none",
    borderRight: "2px solid #ff4081",
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    color: "#ff4081",
    fontWeight: "bold",
  },
  signOut: {
    cursor: "pointer",
    color: "black",
    marginRight: 2,
  },
});

const isActive = (history, path) => ({
  color: history.location.pathname === path ? "#ff4081" : "black",
  fontWeight: history.location.pathname === path ? "bold" : "400",
  marginRight: 3,
  padding: "0px 8px",
});

const Menu = ({ history, classes }) => (
  <AppBar position="static" color="inherit" className={classes.navBar}>
    <Toolbar>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" className={classes.link} style={{ borderRight: "none" }}>
            <img src={"/assets/images/WebLogo.png"} height={50} alt="Logo" />
          </Link>
          <Link to="/" className={classes.link} style={{ borderRight: "none" }}>
            <Typography variant="h6" className={classes.title}>
              EASYSELL
            </Typography>
          </Link>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link to="/" className={classes.link}>
            <IconButton aria-label="Home" style={isActive(history, "/")}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/shops/all" className={classes.link}>
            <Typography style={isActive(history, "/shops/all")}>
              ALL SHOPS
            </Typography>
          </Link>
          <Link to="/cart" className={classes.link}>
            <IconButton aria-label="Cart" style={isActive(history, "/cart")}>
              <Badge
                badgeContent={cart.itemTotal()}
                color="secondary"
                overlap="rectangular"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          {auth.isAuthenticated() && (
            <>
              <Link to={`/seller/shops`} className={classes.link}>
                <Typography style={isActive(history, "/seller/shops")}>
                  SELL
                </Typography>
              </Link>
              <Link
                to={`/user/${auth.isAuthenticated().user._id}`}
                className={classes.link}
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
              {/* <Typography
                onClick={() => auth.clearJWT(() => history.push("/"))}
                style={classes.signOut}
              >
                Sign out
              </Typography> */}
              <Button
                onClick={() => auth.clearJWT(() => history.push("/"))}
                className={classes.signOut}
              >
                Sign out
              </Button>
            </>
          )}
          {!auth.isAuthenticated() && (
            <>
              <Link to="/signup" className={classes.link}>
                <Typography style={isActive(history, "/signup")}>
                  SIGN UP
                </Typography>
              </Link>
              <Link to="/signin" className={classes.link}>
                <Typography style={isActive(history, "/signin")}>
                  SIGN IN
                </Typography>
              </Link>
            </>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default withRouter(withStyles(styles)(Menu));
