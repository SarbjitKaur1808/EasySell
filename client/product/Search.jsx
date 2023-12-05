import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import { listCategories } from './api-product'; // Import the listCategories API call

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: '#80808024',
    paddingBottom: theme.spacing(2),
  },
  selectField: {
    width: 240, // Set a fixed width for the category select field
    marginRight: theme.spacing(1), // Add some space between the fields
  },
  textField: {
    width: 240, // Set a fixed width for the search text field
  },
  searchButton: {
    minWidth: '20px',
    height: '55px', // Adjust the height to match TextField height
    padding: '0 8px',
    marginTop: '16px', // Align button with TextField
  },
  menu: {
    width: 200, // Ensure the dropdown is also of a fixed width
  }
}));

// ... (rest of the imports)

export default function Search(props) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All'); // Default to 'All'
  const [categories, setCategories] = useState(['All']); // Start with 'All' in the array

  useEffect(() => {
    listCategories().then(data => {
      if (data && !data.error) {
        setCategories(['All', ...data]); // Prepend 'All' to the categories from the API
      } else {
        console.log(data.error);
      }
    });
  }, []);

  const handleSearch = () => {
    props.onSearch(search, category === 'All' ? '' : category); // Pass an empty string for 'All' category
  };

  return (
    <Card className={classes.card}>
      <TextField
        id="select-category"
        select
        label="Select category"
        className={classes.selectField}
        value={category}
        onChange={e => setCategory(e.target.value)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {/* Include the 'All' option and map through the rest of the categories */}
        {categories.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
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
        <SearchIcon />
      </Button>
    </Card>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
};
