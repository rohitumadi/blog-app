import { useEffect, useState } from "react";
import userContext from "./userContext";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: {},
    login: false,
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
