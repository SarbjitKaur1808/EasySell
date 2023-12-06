import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import Search from "../product/Search";
import Category from "../product/Categories";
import { list, listCategories } from "../product/api-product";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const loadProducts = (searchQuery = "", category = "") => {
    setLoading(true);

    let query = {};

    // Check if both searchQuery and category are provided
    if (searchQuery != "" && category != "") {
      query = { search: searchQuery, category: category };
    }
    // Check if only searchQuery is provided
    else if (searchQuery != "") {
      query = { search: searchQuery, category: selectedCategory };
    }
    // Check if only category is provided
    else if (category != "") {
      query = { category: category };
    }

    list(query).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    listCategories().then((data) => {
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
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Our Store
      </Typography>
      {categories.length > 0 && (
        <Category
          categories={categories}
          onSelect={loadProducts}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <Box mb={4}>
        <Search onSearch={loadProducts} />
      </Box>
      {loading && <Typography>Loading products...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {!loading && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ maxWidth: 345, m: "auto", boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/api/product/image/${product._id}`}
                    alt={product.name}
                    sx={{ objectFit: "contain", background: "#f7f7f7" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      {product.quantity === 0 ? (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          Out of stock
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            bgcolor: "secondary.main",
                            color: "#fff",
                            p: "2px 5px",
                            borderRadius: "4px",
                          }}
                        >
                          {product.quantity}+ More
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No products found.</Typography>
        )}
      </Grid>
    </Box>
  );
}
