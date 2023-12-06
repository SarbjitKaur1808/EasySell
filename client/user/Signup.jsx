import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { create } from "./api-user.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    backgroundColor: "#fff5f8", // Light pink background for the card
    color: "#ff4081", // Pink color for text
  },
  error: {
    verticalAlign: "middle",
    color: "#ff4081", // Pink color for error icon
  },
  title: {
    marginTop: theme.spacing(2),
    color: "#ff4081", // Pink color for the title
    fontWeight: 400, // Lower the font weight
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    "& label.Mui-focused": {
      color: "#ff4081", // Pink color for label focus
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff4081", // Pink color for underline focus
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ff4081", // Pink color for outlined focus
      },
    },
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
    backgroundColor: "#ff4081", // Pink color for the button
    color: "#ffffff", // White color text for the button
    "&:hover": {
      backgroundColor: "#ff4081", // Darken the pink color on hover
    },
  },
  // Add styles for the image
  media: {
    height: 190,
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // Image URL from the uploaded file
    backgroundImage: `url(${"https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"})`,
  },
}));

export default function Signup() {
  const classes = useStyles();
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

  const isValidPassword = (password) => {
    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{6,})"
    );
    return pattern.test(password);
  };
  const clickSubmit = () => {
    // Check if the password is valid
    if (!isValidPassword(values.password)) {
      setValues({
        ...values,
        error:
          "Password must contain at least 6 characters, including 1 symbol and 1 number.",
      });
      return;
    }
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };
  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.media} />

        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            required
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            required
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            required
          />
          <br />{" "}
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={values.open}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            // Do nothing on backdrop click
            return;
          }
          // Handle closing the dialog for other reasons, like pressing the escape key
          setValues({ ...values, open: false });
        }}
      >
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
