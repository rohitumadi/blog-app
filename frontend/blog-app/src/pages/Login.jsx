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
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/userService";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

function Login() {
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const userContextData = useContext(userContext);
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    if (loginDetail.username === "" || loginDetail.password === "") {
      toast.error("username or password blank");
      return;
    }
    loginUser(loginDetail)
      .then((data) => {
        // save data to localStorage
        doLogin(data, () => {
          //redirect to user dashboard page
          userContextData.setUser({
            data: data.user,
            login: true,
          });
          navigate("/user/dashboard");
        });
        toast.success("Login successful");
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 404)
          toast.error(err.response.data.message);
        else toast.error("Something went wrong please try again");
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
