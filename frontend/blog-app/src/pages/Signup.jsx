import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  function handleChange(e, field) {
    setData({ ...data, [field]: e.target.value });
  }
  function resetData() {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
    setError({ errors: {}, isError: false });
  }
  function handleSubmitForm(e) {
    e.preventDefault();

    //call server api for sending the data
    signUp(data)
      .then((res) => {
        console.log(res);
        toast.success("User is registered!");
        navigate("/login");
        resetData();
      })
      .catch((err) => {
        setError({
          errors: err,
          isError: true,
        });

        console.log(err);
      });
  }
  return (
    <Base>
      <Container>
        <h1 className="text-center">Sign in</h1>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Enter your details</CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmitForm}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      onChange={(e) => handleChange(e, "name")}
                      id="name"
                      name="name"
                      placeholder="adam"
                      type="text"
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      id="email"
                      name="email"
                      placeholder="adam@gmail.com"
                      type="email"
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      id="password"
                      name="password"
                      type="password"
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      style={{ height: "4rem" }}
                      id="about"
                      name="text"
                      type="textarea"
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark">Register</Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
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
