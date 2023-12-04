import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, TextField, IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { list } from "../product/api-product";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const loadProducts = () => {
      list({ search: searchQuery }).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
        setLoading(false);
      });
    };

    loadProducts();
  }, [searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <TextField
            id="search-products"
            label="Search products"
            type="search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                fontSize: '1.5rem', // Makes the text larger
              }
            }}
            style={{ 
              marginRight: '8px', 
              width: '50%', // Adjust width as needed
              height: '3.5rem', // Adjust height to make input taller
            }}
          />
      </div>
      {loading && <Typography>Loading products...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && products.length > 0 && (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={product._id}>
              <Card style={{ maxWidth: "300px", height: "100%" }}>
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <img
                    src={"/api/product/image/" + product._id}
                    alt={product.name}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
