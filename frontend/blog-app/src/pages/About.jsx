import Base from "../components/Base";
import userContext from "../context/userContext";
function About() {
  return (
    <userContext.Consumer>
      {(user) => (
        <Base>
          <h1>This is about page</h1>
          <h1>welcome {user.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  );
}
export default About;
