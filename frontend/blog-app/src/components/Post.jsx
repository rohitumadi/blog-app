import { Button, Card, CardBody, CardText } from "reactstrap";

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
        <CardText>
          <p>{post.content.substring(0, 30)}...</p>
        </CardText>
        <div>
          <Button>Read More</Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
