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
export function getAllPosts(pageNumber = 0, pageSize = 5) {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=dateCreated&sortDir=desc`
    )
    .then((res) => res.data);
}

// get single post
export function getSinglePost(postId) {
  return myAxios.get(`/posts/${postId}`).then((res) => res.data);
}

export function createComment(comment, postId) {
  return privateAxios
    .post(`/post/${postId}/comments`, { content: comment })
    .then((res) => res.data);
}

export function uploadPostImage(image, postId) {
  let formData = new FormData();
  formData.append("image", image); //key used here is from backend
  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      "Content-Type": "multipart/form-data",
    })
    .then((res) => res.data);
}

export function getPostsByCategory(categoryId, pageNumber = 0, pageSize = 5) {
  return privateAxios
    .get(
      `/category/${categoryId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=dateCreated&sortDir=desc`
    )
    .then((res) => {
      return res.data;
    });
}
