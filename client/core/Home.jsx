import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { list } from "../product/api-product";
import { ImageList, ImageListItem } from "@material-ui/core";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const loadProducts = () => {
      list().then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
        setLoading(false);
      });
    };

    loadProducts();
  }, []);

  const renderImage = (image) => {
    if (typeof image === "string") {
      return `data:${image.contentType};base64,${image.data}`;
    }
  };



return (
  <div>
    <h1>Welcome</h1>
    {loading && <Typography>Loading products...</Typography>}
    {error && <Typography color="error">{error}</Typography>}
    {!loading && products.length > 0 && (
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={product._id}> {/* Adjusted for more items per row */}
            <Card style={{ maxWidth: "300px", height: "100%" }}> {/* Adjusted Card Size */}
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
