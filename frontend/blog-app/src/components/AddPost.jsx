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
import JoditEditor from "jodit-react";

function AddPost() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: "Start typing...",
  };

  const [categories, setCategories] = useState([]);
  useEffect(function () {
    async function fetchCategories() {
      try {
        const res = await loadCategories();
        setCategories(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);
  return (
    <div
      className=" d-flex align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <Card className="shadow" style={{ width: "60%", height: "90%" }}>
        <CardBody>
          <h3> What's on your mind today</h3>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Web Development"
                type="text"
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
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </FormGroup>

            <FormGroup>
              <Label for="category">Post Category</Label>
              <Input id="category" name="select" type="select">
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
              <Button color="success">Create Post</Button>
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
