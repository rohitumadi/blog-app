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
import InfiniteScroll from "react-infinite-scroll-component";

function NewFeed() {
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(
    function () {
      changePage(currentPage);
    },
    [currentPage]
  );

  async function changePage(pageNumber = 0, pageSize = 5) {
    if (pageNumber > posts.pageNumber && posts.lastPage) return;
    if (pageNumber < posts.pageNumber && posts.pageNumber === 0) return;
    try {
      const res = await getAllPosts(pageNumber, pageSize);
      setPosts({
        content: [...posts.content, ...res.content],
        totalPages: res.totalPages,
        totalElements: res.totalElements,
        pageSize: res.pageSize,
        lastPage: res.lastPage,
        pageNumber: res.pageNumber,
      });
      console.log(res);
      window.scrollTo(0, 0);
    } catch (err) {
      toast.error("Error fetching Posts");
    }
  }

  function changePageInfinite() {
    console.log("page changed");
    setCurrentPage((currentPage) => currentPage + 1);
  }
  return (
    <div className="conatiner-fluid my-3 ">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <h1>Blogs count {posts?.totalElements}</h1>

          <InfiniteScroll
            dataLength={posts?.totalElements}
            next={changePageInfinite}
            hasMore={!posts?.lastPage}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts?.content.map((post) => (
              <Post post={post} key={post.postId} />
            ))}
          </InfiniteScroll>

          {/* <Container className="mt-3">
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
          </Container> */}
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
