//isLoggedIn

export function isLoggedIn() {
  let data = localStorage.getItem("data");
  if (data === null) return false;
  else return true;
}
//doLogin-set jwt to localstorage

export function doLogin(data, next) {
  localStorage.setItem("data", JSON.stringify(data));
  next();
}
//doLogout- remove jwt from localstorage
export function doLogout(next) {
  localStorage.removeItem("data");
  next();
}
//get Current User
export function getCurrentUser() {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).userDto;
  } else return undefined;
}

export function getToken() {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else return undefined;
}
