import { myAxios } from "./helper";

export function signUp(user) {
  return myAxios.post("/api/v1/auth/signup", user).then((res) => res.data);
}
export function loginUser(loginDetails) {
  return myAxios
    .post("/api/v1/auth/login", loginDetails, loginDetails)
    .then((res) => res.data);
}
