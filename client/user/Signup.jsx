import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Icon,
  DialogContentText,
} from "@material-ui/core";
import { create } from "./api-user.js";
import { Link } from "react-router-dom";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      console.log("data", data);
      if (data == undefined) {
        return;
      }
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Sign Up</Typography>
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange("password")}
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error">error</Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <DialogActions>
        <Link to="/signin">
          <Button color="primary" autoFocus="autoFocus" variant="contained">
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </div>
  );
}
