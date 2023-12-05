import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#80808024'
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    marginBottom: '20px'
  },
  searchButton: {
    minWidth: '20px',
    height: '30px',
    padding: '0 8px',
    marginBottom: '20px'
  }
}));

export default function Search(props) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    props.onSearch(search, category);
  };

  return (
    <Card className={classes.card}>
      <TextField
        id="select-category"
        select
        label="Select category"
        className={classes.textField}
        value={category}
        onChange={e => setCategory(e.target.value)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Books">Books</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Clothing">Clothing</MenuItem>
        <MenuItem value="Home Decor">Home Decor</MenuItem>
        {/* Add more categories here */}
      </TextField>
      <TextField
        id="search"
        label="Search products"
        type="search"
        className={classes.textField}
        value={search}
        onChange={e => setSearch(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color={'primary'} className={classes.searchButton} onClick={handleSearch}>
        <SearchIcon/>
      </Button>
    </Card>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
};
