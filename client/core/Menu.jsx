import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { WebLogo } from "../assets/images/images.js";

const Menu = withRouter(({ history }) => {
  const isActive = (path) =>
    history.location.pathname === path ? { color: "#bef67a" } : { color: "#ffffff" };

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" color="inherit">
            EASYSELL
          </Typography>
          <img src={WebLogo} height={50} width={50} alt="Logo" style={{ marginLeft: "10px" }} />
        </div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive("/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <div style={{ position: "absolute", right: "10px" }}>
          <Link to="/signup">
            <Button style={isActive("/signup")}>Sign Up</Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive("/signin")}>Sign In</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Menu;
