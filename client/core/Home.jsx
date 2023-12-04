import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, TextField, IconButton, Paper, InputBase } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";
import { list } from "../product/api-product";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800, // adjust this to match the image
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    list({ search: searchQuery }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    });
  }, [searchQuery]);

  const handleSearch = () => {
    setLoading(true);
    list({ search: searchQuery }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <h1>Welcome</h1>
      <Paper component="form" className={classes.root} elevation={1} square>
        <InputBase
          className={classes.input}
          placeholder="Search products"
          inputProps={{ 'aria-label': 'search products' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* Loading, error, and product grid code remains unchanged */}
      {loading && <Typography>Loading products...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && products.length > 0 && (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card style={{ margin: "10px" }}>
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <img
                    src={"/api/product/image/" + product._id}
                    alt={product.name}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
