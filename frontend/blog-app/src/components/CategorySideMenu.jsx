import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadCategories } from "../services/categoryService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CategorySideMenu() {
  const [categories, setCategories] = useState([]);
  useEffect(function () {
    async function getCategories() {
      try {
        const res = await loadCategories();
        // console.log(res);
        setCategories([...res]);
      } catch (err) {
        toast.error("error loading categories");
      }
    }
    getCategories();
  }, []);
  return (
    <div>
      <ListGroup flush>
        <ListGroupItem className="mb-5 border shadow">Categories</ListGroupItem>
        <ListGroupItem
          className="border shadow"
          tag={Link}
          to="/"
          action={true}
        >
          All Blogs
        </ListGroupItem>

        {categories &&
          categories.map((category, index) => (
            <ListGroupItem
              key={index}
              tag={Link}
              to={"/categories/" + category.categoryId}
              className="border shadow"
              action={true}
            >
              {category.categoryTitle}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}

export default CategorySideMenu;
