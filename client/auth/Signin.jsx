import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  makeStyles,
  Icon
} from "@material-ui/core";
import { signin } from "./api-auth.js"; 
import { list } from '../product/api-product.js'; 
//import { Redirect } from 'react-router-dom';
import auth from './../auth/auth-helper'; 

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}));

export default function Signin(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false // Added redirectToReferrer here
  });
  const [products, setProducts] = useState([]); // State to store products

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const loadProducts = () => {
    list().then(data => {
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
      password: values.password || undefined
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => { // Assuming you have an authenticate method in auth-helper
          setValues({ ...values, error: "", redirectToReferrer: true });
          loadProducts(); // Load products on successful sign-in
        });
      }
    });
  };

  const { from } = props.location.state || { from: { pathname: '/' } };
  if (values.redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.title}>Sign In</Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          fullWidth
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
        />
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error">error</Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit} fullWidth>
          Submit
        </Button>
      </CardActions>

      {/* Display Products */}
      {products.length > 0 && (
        <div>
          <Typography variant="h6">Products</Typography>
          {products.map(product => (
            <Card key={product._id} style={{ margin: '10px' }}>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                {product.image && <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
