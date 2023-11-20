import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { toast } from "react-toastify";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "./Post";

function NewFeed() {
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: 0,
  });

  useEffect(function () {
    changePage(0);
  }, []);

  async function changePage(pageNumber = 0, pageSize = 5) {
    if (pageNumber > posts.pageNumber && posts.lastPage) return;
    if (pageNumber < posts.pageNumber && posts.pageNumber === 0) return;
    try {
      const res = await getAllPosts(pageNumber, pageSize);
      setPosts(res);
      console.log(res);
      window.scrollTo(0, 0);
    } catch (err) {
      toast.error("Error fetching Posts");
    }
  }
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

          <Container className="mt-3">
            <Pagination size="">
              <PaginationItem
                onClick={() => changePage(posts.pageNumber - 1)}
                disabled={posts.pageNumber === 0}
              >
                <PaginationLink previous />
              </PaginationItem>
              {[...Array(posts?.totalPages)].map((item, index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={index === posts.pageNumber}
                  key={index}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                onClick={() => changePage(posts.pageNumber + 1)}
                disabled={posts.lastPage}
              >
                <PaginationLink next />
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
