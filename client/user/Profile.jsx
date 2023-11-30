import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Typography,
  Divider
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import DeleteUser from './DeleteUser.jsx'
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";
// import config from './../../config/config'
// import stripeButton from './../assets/images/stripeButton.png'
// import MyOrders from './../order/MyOrders'

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
  },
  stripe_connect: {
    marginRight: "10px",
  },
  stripe_connected: {
    verticalAlign: "super",
    marginRight: "10px",
  },
}));

export default function Profile({ match }) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      console.log(data)
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />{" "}
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id}/>
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
