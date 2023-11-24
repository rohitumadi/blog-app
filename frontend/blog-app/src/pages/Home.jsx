import { useEffect } from "react";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";

function Home() {
  return (
    <Base>
      <Container>
        <Row>
          <Col>
            <NewFeed />
          </Col>
          <Col md={2} className="mt-4">
            <CategorySideMenu />
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Home;
