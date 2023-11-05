import { myAxios } from "./helper";

export function loadCategories() {
  return myAxios.get(`/categories/`).then((res) => {
    return res.data;
  });
}
