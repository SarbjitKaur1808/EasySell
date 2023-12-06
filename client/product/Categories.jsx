import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid #ff4081",
  },
  categoryItem: {
    cursor: "pointer",
    flexGrow: 1,
    textAlign: "center",
    padding: theme.spacing(2),
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiListItemText-primary": {
      // Increased specificity for targeting span inside ListItemText
      fontWeight: "400", // Regular font weight by default
    },
    "&$selectedCategory .MuiListItemText-primary": {
      // Increased specificity for selected item
      color: "#ff4081", // Specific text color for selected item
      fontWeight: "bold", // Bold font weight for selected item
    },
  },
  selectedCategory: {}, // Empty placeholder for the increase of specificity
}));
function Category(props) {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    props.onSelect("", category);
    props.setSelectedCategory(category); // Pass the selected category to the onSelect prop
  };
  return (
    <div className={classes.root}>
      {props.categories.map((category, index) => (
        <ListItem
          key={index}
          className={`${classes.categoryItem} ${
            selectedCategory === category ? classes.selectedCategory : ""
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          <ListItemText primary={category} className={classes.categoryName} />
        </ListItem>
      ))}
    </div>
  );
}

Category.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default Category;
