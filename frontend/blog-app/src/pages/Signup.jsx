import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";

function Signup() {
  return (
    <Base>
      <Container>
        <h1 className="text-center">Sign in</h1>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Enter your details</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="adam"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="adam@gmail.com"
                      type="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" name="password" type="password" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      style={{ height: "4rem" }}
                      id="about"
                      name="text"
                      type="textarea"
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark">Register</Button>
                    <Button color="secondary" type="reset" className="ms-2">
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Signup;
