import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
//this component is displayed in the new feed one by one
function Post({
  post = {
    title: "this is default post title",
    content: "this is default post content",
  },
}) {
  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 30) + "...",
          }}
        ></CardText>
        <div>
          <Link className="btn btn-secondary" to={"/posts/" + post.postId}>
            Read More
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
