import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { list } from '../product/api-product'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const loadProducts = () => {
      list().then(data => {
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
    if (typeof image === 'string') {
      
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
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card style={{ margin: '10px' }}>
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  {product.image && <img src={renderImage(product.image)} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

   

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

export default function Home(){ 
const classes = useStyles()
return (
<Card className={classes.card}>
   
  <Typography variant="h6" className={classes.title}>Home Page</Typography>

<CardContent>
<Typography variant="body2" component="p"> 
Welcome to the MERN Skeleton home page.
</Typography> 
</CardContent>
</Card> 
)
} */

