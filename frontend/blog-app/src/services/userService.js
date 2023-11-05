import { myAxios } from "./helper";

export function signUp(user) {
  return myAxios.post("/auth/signup", user).then((res) => res.data);
}
export function loginUser(loginDetails) {
  return myAxios
    .post("/auth/login", loginDetails, loginDetails)
    .then((res) => res.data);
}
