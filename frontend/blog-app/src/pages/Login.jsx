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
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
import { doLogin } from "../auth";

function Login() {
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });
  function toastSuccess(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  function toastError(message) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(loginDetail);
    if (loginDetail.username === "" || loginDetail.password === "") {
      toastError("username or password blank");
      return;
    }
    loginUser(loginDetail)
      .then((data) => {
        // save data to localStorage
        doLogin(data, () => {
          console.log("login detail is saved to localStorage");
          //redirect to user dashboard page
        });
        toastSuccess("Login successful");
        console.log(data);
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 404)
          toastError(err.response.data.message);
        else toastError("Something went wrong please try again");

        console.log(err);
      });
  }

  function handleReset() {
    setLoginDetail({
      username: "",
      password: "",
    });
  }
  return (
    <Base>
      <Container>
        <h1 className="text-center">Log in</h1>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Enter your details</CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      onChange={(e) =>
                        setLoginDetail({
                          ...loginDetail,
                          username: e.target.value,
                        })
                      }
                      value={loginDetail.username}
                      id="email"
                      name="email"
                      placeholder="adam@gmail.com"
                      type="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={loginDetail.password}
                      onChange={(e) =>
                        setLoginDetail({
                          ...loginDetail,
                          password: e.target.value,
                        })
                      }
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="dark">Login</Button>
                    <Button
                      onClick={handleReset}
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

export default Login;
