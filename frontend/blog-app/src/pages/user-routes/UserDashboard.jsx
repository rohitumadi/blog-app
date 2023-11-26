import {
  Badge,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../../auth";
import {
  deletePost,
  deletePostApi,
  getPostsByUser,
} from "../../services/postService";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import Post from "../../components/Post";

function UserDashboard() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: 0,
  });

  useEffect(function () {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser.id === undefined) return;
    loadPostsByUser(currentUser.id);
  }, []);

  async function loadPostsByUser(userId, pageNumber = 0, pageSize = 5) {
    try {
      const res = await getPostsByUser(userId, pageNumber, pageSize);

      setPosts({
        content: [...res.content],
        totalPages: res.totalPages,
        totalElements: res.totalElements,
        pageSize: res.pageSize,
        lastPage: res.lastPage,
        pageNumber: res.pageNumber,
      });
      // window.scrollTo(0, 50);
      window.scrollTo({
        top: 725,
        behavior: "smooth",
      });
    } catch (err) {
      toast.error("Error loading your posts");
    }
  }
  async function changePage(pageNumber = 0, pageSize = 5) {
    if (pageNumber > posts.pageNumber && posts.lastPage) return;
    if (pageNumber < posts.pageNumber && posts.pageNumber === 0) return;
    await loadPostsByUser(user.id, pageNumber, pageSize);
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
      console.log(err);
    }
  }

  return (
    <Base>
      <Container>
        <AddPost />
        <h1>
          Your Blogs
          <Badge className="ms-2">
            <CountUp start={0} end={posts?.totalElements} duration={3} />
          </Badge>
        </h1>
        {posts.totalElements === 0 && <h1>You haven't created any post!</h1>}
        {posts.totalElements !== 0 &&
          posts.content.map((post, index) => (
            <Post post={post} key={index} deletePost={deletePost} />
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
      </Container>
    </Base>
  );
}

export default UserDashboard;
