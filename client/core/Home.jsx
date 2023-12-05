import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom'; // Import Link
import Search from '../product/Search';
import { list, listCategories } from '../product/api-product'; // Import listCategories

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = (searchQuery = '', category = '') => {
    setLoading(true);
    list({ search: searchQuery, category: category })
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
        setLoading(false);
      });
  };

  // Load categories from the API
  useEffect(() => {
    setLoading(true);
    listCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <Typography variant='h3' component='h1' gutterBottom>
        Welcome
      </Typography>
      <Box mb={4}>
        <Search categories={categories} onSearch={loadProducts} /> {/* Pass categories to Search */}
      </Box>
      {loading && <Typography>Loading products...</Typography>}
      {error && <Typography color='error'>{error}</Typography>}
      <Box mt={4}>
        {!loading && products.length > 0 && (
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={product._id}>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                  <Card style={{ maxWidth: '300px', height: '100%' }}>
                    <CardContent>
                      <Typography variant='h6'>{product.name}</Typography>
                      <Typography variant='body2'>{product.description}</Typography>
                      <img
                        src={`/api/product/image/${product._id}`}
                        alt={product.name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}
