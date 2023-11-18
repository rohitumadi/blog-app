import { useEffect } from "react";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import { Container } from "reactstrap";

function Home() {
  return (
    <Base>
      <Container>
        <NewFeed />
      </Container>
    </Base>
  );
}

export default Home;
