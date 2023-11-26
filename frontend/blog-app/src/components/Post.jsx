import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../auth";
import { MdDeleteForever } from "react-icons/md";
//this component is displayed in the new feed one by one
function Post({
  post = {
    title: "this is default post title",
    content: "this is default post content",
  },
  deletePost,
}) {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(function () {
    setUser(getCurrentUser());
    setLogin(isLoggedIn());
  }, []);

  function handleDelete() {
    deletePost(post);
    toggle();
  }
  return (
    <Card className="border-0 shadow-sm my-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 30) + "...",
          }}
        ></CardText>
        <div>
          <Link
            className="btn btn-secondary border-0"
            to={"/posts/" + post.postId}
          >
            Read More
          </Link>
          {isLoggedIn && user && user.id === post.user.id && (
            <>
              <Button
                onClick={toggle}
                className="ms-3 border-0"
                style={{ backgroundColor: "#f03e3e" }}
              >
                <MdDeleteForever />
              </Button>
              <Modal centered isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                  Are You sure you want to delete this post?
                </ModalHeader>

                <ModalFooter>
                  <Button color="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
