import { myAxios } from "./helper";

export function signUp(user) {
  return myAxios.post("/api/v1/auth/signup", user).then((res) => res.data);
}
