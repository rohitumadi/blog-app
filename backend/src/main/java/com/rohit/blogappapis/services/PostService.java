package com.rohit.blogappapis.services;

import com.rohit.blogappapis.payloads.PostDto;
import com.rohit.blogappapis.payloads.PostResponse;

import java.util.List;

public interface PostService  {
    PostDto createPost(PostDto postDto,Integer userId,Integer categoryId);
    PostDto updatePost(PostDto postDto,Integer postId);
    PostDto getPostById(Integer postId);
    PostResponse getAllPosts(Integer pageNumber  , Integer pageSize,String sortBy,String sortDir);
    void deletePost(Integer postId);

    PostResponse getPostsByCategory(Integer pageNumber  , Integer pageSize,Integer categoryId,String sortBy,String sortDir);

    PostResponse  getPostsByUser(Integer pageNumber  , Integer pageSize,Integer userId);

    List<PostDto> searchPosts(String keyword);
}
