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
import { list } from '../product/api-product.js'; // Import the list function from api-product.js

export default function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [products, setProducts] = useState([]); // State to store products

  const handleChange = (name) => (event) => {
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
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "" });
        loadProducts(); // Load products on successful sign-in
      }
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Sign In</Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          type="password"
          label="Password"
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
        <Button color="primary" variant="contained" onClick={clickSubmit} fullWidth>
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
