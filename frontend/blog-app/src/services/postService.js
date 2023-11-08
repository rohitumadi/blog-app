import { myAxios } from "./helper";

export function createPost(postData) {
  return myAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((res) => res.data);
}
