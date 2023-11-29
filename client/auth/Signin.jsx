import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Icon
} from "@material-ui/core";
import { signin } from "./api-auth.js";

export default function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {

      console.log("data",data)
      if (data == undefined) {
        return;
      }

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "" });
      }
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography>Sign In</Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.Email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
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
  );
}
