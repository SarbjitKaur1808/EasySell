import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  makeStyles,
  Icon,
} from "@material-ui/core";
import { signin } from "./api-auth.js";
import { list } from "../product/api-product.js";
import { Redirect } from "react-router-dom";
import auth from "./../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
    backgroundColor: "#fff5f8", // Light pink background for the card
    color: "#ff4081", // Pink color for text
  },
  title: {
    marginTop: theme.spacing(2),
    color: "#ff4081", // Pink color for the title
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%",
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
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#ff4081", // Pink color for the button
    color: "#ffffff", // White color text for the button
    "&:hover": {
      backgroundColor: "#e03565", // Darker pink color on hover
    },
  },
  error: {
    color: theme.palette.error.dark,
    marginTop: theme.spacing(2),
  },
}));

export default function Signin(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false, // Added redirectToReferrer here
  });
  const [products, setProducts] = useState([]); // State to store products

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const loadProducts = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          // Assuming you have an authenticate method in auth-helper
          setValues({ ...values, error: "", redirectToReferrer: true });
          loadProducts(); // Load products on successful sign-in
        });
      }
    });
  };

  const { from } = props.location.state || { from: { pathname: "/" } };
  if (values.redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          Sign In
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          fullWidth
          required
        />
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error">error</Icon>
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
          fullWidth
        >
          Submit
        </Button>
      </CardActions>

      {/* Display Products */}
      {products.length > 0 && (
        <div>
          <Typography variant="h6">Products</Typography>
          {products.map((product) => (
            <Card key={product._id} style={{ margin: "10px" }}>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
