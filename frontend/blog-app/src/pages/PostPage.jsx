import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { createComment, getSinglePost } from "../services/postService";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";
//this component is displayed when one of the post is clicked from new feed
function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(function () {
    async function loadPost() {
      try {
        const res = await getSinglePost(postId);
        setPost(res);
        console.log(res);
      } catch (err) {
        toast.error("Error loading post");
      }
    }
    loadPost();
  }, []);

  async function handleSubmit() {
    if (!isLoggedIn()) {
      toast.error("You must be logged in to comment");
      return;
    }
    if (comment.trim() === "") return;

    try {
      const res = await createComment(comment, postId);
      console.log(res.content);
      toast.success("Comment added");
      setPost({
        ...post,
        comments: [...post.comments, res],
      });
      setComment("");
    } catch (err) {
      toast.error("Error creating comment");
    }
  }
  return (
    <Base>
      <Container className="mt-4">
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            {post && (
              <Card body color="secondary" outline>
                <img
                  className="img-fluid shadow m-5"
                  alt=""
                  src={BASE_URL + "/post/image/" + post.imageName}
                  // width="50%"
                  // height="50%"
                />
                <CardBody>
                  <Badge color="primary">{post.category.categoryTitle}</Badge>
                  <CardTitle tag="h5">{post.title}</CardTitle>

                  <CardText
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                  <CardText>
                    Posted by: <strong>{post.user.name}</strong> on{" "}
                    {new Date(post.dateCreated).toLocaleDateString()}
                  </CardText>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
        <Row className="mt-4 my-2">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ({post?.comments.length})</h3>

            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="textarea"
              placeholder="Your comment..."
            />
            <Button onClick={handleSubmit} className="mt-2">
              Submit
            </Button>

            {post?.comments?.map((comment, index) => (
              <Card key={index} className="mt-2 border-0">
                <CardBody>
                  <CardText>{comment.content}</CardText>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default PostPage;
