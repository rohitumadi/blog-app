import { privateAxios } from "./helper";

export function createPost(postData) {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((res) => res.data);
}
