import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import { listCategories } from "./api-product"; // Import the listCategories API call

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: "#ffffff", // Changed to white for a modern look
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // Soft shadow for depth
    borderRadius: theme.shape.borderRadius, // Use the theme's border radius
    display: "flex", // Use flex layout for inline elements
    alignItems: "center", // Center items vertically
    width: "auto", // Adjust based on parent width
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

export default function Search(props) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(["All"]); // Start with 'All' in the array

  useEffect(() => {
    listCategories().then((data) => {
      if (data && !data.error) {
        setCategories(["All", ...data]); // Prepend 'All' to the categories from the API
      } else {
        console.log(data.error);
      }
    });
  }, []);

  const handleSearch = () => {
    props.onSearch(search); // Pass the search query to the onSearch prop
  };

  // Placeholder text as shown in the image
  const placeholderText = "Try Phones, Samsung or Search by Product Code";

  return (
    <Card className={classes.card}>
      <IconButton className={classes.iconButton} aria-label="menu">
        {/* Icon or Dropdown trigger here if needed */}
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholderText}
        inputProps={{ "aria-label": placeholderText }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Card>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
