import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";

function UserDashboard() {
  return (
    <Base>
      <Container>
        <AddPost />
      </Container>
    </Base>
  );
}

export default UserDashboard;
