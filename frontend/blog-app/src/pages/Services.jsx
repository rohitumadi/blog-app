import Base from "../components/Base";
import userContext from "../context/userContext";
function Services() {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <h1>Welcome {object.user.login && object.user.data.user.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  );
}

export default Services;
