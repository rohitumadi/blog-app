import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import Post from "./Post";

function NewFeed() {
  const [posts, setPosts] = useState(null);
  useEffect(function () {
    async function fetchAllPosts() {
      try {
        const res = await getAllPosts();
        setPosts(res);
        console.log(res);
      } catch (err) {
        toast.error("Error fetching Posts");
      }
    }
    fetchAllPosts();
  }, []);
  return (
    <div className="conatiner-fluid mt-3">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <h1>Blogs count {posts?.totalElements}</h1>
          {posts?.content.map((post) => (
            <Post post={post} key={post.postId} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
