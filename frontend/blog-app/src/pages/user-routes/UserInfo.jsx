import { useContext } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";

function UserInfo() {
  const user = useContext(userContext);
  return (
    <Base>
      <div>
        <h1>Profile info</h1>
        <h1>welcome {user.name}</h1>
      </div>
    </Base>
  );
}

export default UserInfo;
