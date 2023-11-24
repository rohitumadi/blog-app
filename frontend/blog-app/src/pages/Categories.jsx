import { useParams } from "react-router-dom";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import {
  Badge,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { getPostsByCategory } from "../services/postService";
import Post from "../components/Post";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import InfiniteScroll from "react-infinite-scroll-component";

function Categories() {
  const { categoryId } = useParams();
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
    await loadPostByCategory(pageNumber, pageSize);
  }

  async function loadPostByCategory(pageNumber = 0, pageSize = 5) {
    try {
      const res = await getPostsByCategory(categoryId, pageNumber, pageSize);

      setPosts({
        content: [...res.content],
        totalPages: res.totalPages,
        totalElements: res.totalElements,
        pageSize: res.pageSize,
        lastPage: res.lastPage,
        pageNumber: res.pageNumber,
      });
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
      toast.error("error loading posts");
    }
  }
  useEffect(
    function () {
      loadPostByCategory();
    },
    [categoryId]
  );

  return (
    <Base>
      <Container>
        <Row>
          <Col>
            <h1>
              Blogs
              <Badge className="ms-2">
                <CountUp start={0} end={posts?.totalElements} duration={3} />
              </Badge>
            </h1>
            {posts.totalElements === 0 && (
              <h1>No posts in this category ⛔️</h1>
            )}

            {posts.totalElements !== 0 &&
              posts.content.map((post, index) => (
                <Post post={post} key={index} />
              ))}

            {posts.totalElements !== 0 && (
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
            )}
          </Col>
          <Col md={2} className="mt-4">
            <CategorySideMenu />
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
