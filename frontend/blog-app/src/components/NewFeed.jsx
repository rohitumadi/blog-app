import { useEffect, useState } from "react";
import { deletePostApi, getAllPosts } from "../services/postService";
import { toast } from "react-toastify";
import {
  Badge,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import CountUp from "react-countup";

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
      console.log(res);
      setPosts({
        content: [...posts.content, ...res.content],
        totalPages: res.totalPages,
        totalElements: res.totalElements,
        pageSize: res.pageSize,
        lastPage: res.lastPage,
        pageNumber: res.pageNumber,
      });

      //   window.scrollTo(0, 0);
    } catch (err) {
      toast.error("Error fetching Posts");
    }
  }

  function changePageInfinite() {
    console.log("last page", posts.lastPage, posts.pageNumber);

    setCurrentPage((currentPage) => currentPage + 1);
  }
  async function deletePost(post) {
    try {
      const res = await deletePostApi(post.postId);
      toast.success("Post deleted successfully");
      const newPostContent = posts.content.filter(
        (p) => p.postId !== post.postId
      );
      setPosts({ ...posts, content: newPostContent });
    } catch (err) {
      toast.error("Error deleting post, Please try again");
    }
  }
  return (
    <div className="conatiner-fluid my-3 ">
      <Row>
        <Col
          md={{
            size: 12,
          }}
          className="border-end"
        >
          <h1>
            Blogs
            <Badge className="ms-2">
              <CountUp start={0} end={posts?.totalElements} duration={3} />
            </Badge>
          </h1>

          <InfiniteScroll
            dataLength={posts?.pageSize * (posts?.pageNumber + 1)} //length of items that are currently displayed
            next={changePageInfinite}
            hasMore={!posts?.lastPage}
            loader={<h4>Loading...</h4>}
            // height={300}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all 🎉</b>
              </p>
            }
          >
            {posts?.content.map((post, index) => (
              <Post post={post} key={index} deletePost={deletePost} />
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
