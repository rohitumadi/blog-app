import { myAxios, privateAxios } from "./helper";

export function createPost(postData) {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((res) => res.data);
}

//get all posts
export function getAllPosts() {
  return myAxios.get(`/posts`).then((res) => res.data);
}
