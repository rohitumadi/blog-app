import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { loadCategories } from "../services/categoryService";
import React, { useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { toast } from "react-toastify";
import {
  createPost as submitPost,
  uploadPostImage,
} from "../services/postService";
import { getCurrentUser } from "../auth";

function AddPost() {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [image, setImage] = useState(null);

  useEffect(function () {
    async function fetchCategories() {
      try {
        setUser(getCurrentUser());
        const res = await loadCategories();
        setCategories(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  function fieldChanged(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }
  function contentFieldChanged(data) {
    setPost({ ...post, content: data });
  }
  function createPost(e) {
    e.preventDefault();
    if (post.title === "") {
      toast.error("Post title cannot be empty");
      return;
    }
    if (post.content === "") {
      toast.error("Post content cannot be empty");
      return;
    }
    if (post.categoryId === "") {
      toast.error("Please select a category");
      return;
    }
    post["userId"] = user.id;
    submitPost(post)
      .then((res) => {
        uploadPostImage(image, res.postId)
          .then((res) => {})
          .catch((err) => {
            toast.error("Error uploading image");
          });

        toast.success("Post created successfully");
        setPost({
          title: "",
          content: "",
          categoryId: 0,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong please try again!");
      });
  }
  function handleFileChange(e) {
    setImage(e.target.files[0]);
  }
  return (
    <div
      className=" d-flex align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <Card
        className="shadow"
        style={{ width: "60%", height: "90%", overflow: "auto" }}
      >
        <CardBody>
          <h3> What's on your mind today</h3>
          <Form onSubmit={createPost}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={post.title}
                placeholder="Web Development"
                type="text"
                onChange={fieldChanged}
              />
            </FormGroup>
            <FormGroup>
              <Label for="title">Post Content</Label>
              {/* <Input
                id="content"
                name="content"
                placeholder="Web Development is an ever evolving field..."
                type="textarea"
                style={{ height: "20vh" }}
              /> */}
              <JoditEditor
                ref={editor}
                value={post.content}
                tabIndex={1} // tabIndex of textarea
                onChange={contentFieldChanged}
              />
            </FormGroup>
            <div className="mt-2">
              <Label for="image">Select Post Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>

            <FormGroup>
              <Label for="category">Post Category</Label>
              <Input
                id="category"
                name="categoryId"
                type="select"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  Select category
                </option>
                {/* load dynamic categories */}
                {categories.map((category) => {
                  return (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <Container className="text-center mt-4">
              <Button type="submit" color="success">
                Create Post
              </Button>
              <Button color="success" className="ms-2">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddPost;
