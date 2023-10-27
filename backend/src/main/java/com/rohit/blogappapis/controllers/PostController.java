package com.rohit.blogappapis.controllers;

import com.rohit.blogappapis.payloads.ApiResponse;
import com.rohit.blogappapis.payloads.PostDto;
import com.rohit.blogappapis.payloads.PostResponse;
import com.rohit.blogappapis.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto,
                                              @PathVariable Integer userId,
                                              @PathVariable Integer categoryId) {

        PostDto newPost=this.postService.createPost(postDto, userId, categoryId);
        return  new ResponseEntity<PostDto>(newPost, HttpStatus.CREATED);
    }

    @GetMapping("/category/{categoryId}/posts")
    public  ResponseEntity<PostResponse> getPostsByCategory(@RequestParam(value = "pageNumber", defaultValue ="1",required = false) Integer pageNumber,
                                                            @RequestParam(value = "pageSize", defaultValue ="5",required = false) Integer pageSize,@PathVariable Integer categoryId)
    {
        PostResponse posts=this
                .postService
                .getPostsByCategory(pageNumber, pageSize,categoryId);
        return new ResponseEntity<PostResponse>(posts,HttpStatus.OK);

    }
    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<PostResponse> getPostsByUser(@RequestParam(value = "pageNumber", defaultValue ="1",required = false) Integer pageNumber,
                                                        @RequestParam(value = "pageSize", defaultValue ="5",required = false) Integer pageSize,@PathVariable Integer userId)
    {
        PostResponse posts=this.postService.getPostsByUser(pageNumber, pageSize,userId);
        return new ResponseEntity<PostResponse>(posts,HttpStatus.OK);
    }
    @GetMapping("/posts")
    public ResponseEntity<PostResponse> getAllPosts(@RequestParam(value = "pageNumber", defaultValue ="1",required = false) Integer pageNumber,
                                                    @RequestParam(value = "pageSize", defaultValue ="5",required = false) Integer pageSize,
                                                    @RequestParam(value = "sortBy", defaultValue ="postId",required = false) String sortBy,
                                                    @RequestParam(value = "sortDir", defaultValue ="asc",required = false) String sortDir
    )//pagenumber starts from 0
    {
        PostResponse  posts=this.postService.getAllPosts(pageNumber, pageSize,sortBy,sortDir);
        return new ResponseEntity<PostResponse>(posts,HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId)
    {
        PostDto postDto=this.postService.getPostById(postId);
        return new ResponseEntity<PostDto>(postDto,HttpStatus.OK);
    }

    @DeleteMapping ("/posts/{postId}")
    public ApiResponse deletePostById(@PathVariable Integer postId)
    {
        this.postService.deletePost(postId);
        return new ApiResponse("Post deleted",true);
    }

    @PutMapping ("/posts/{postId}")
    public ResponseEntity<PostDto> updatePostById(@RequestBody PostDto postDto,@PathVariable Integer postId)
    {
        PostDto updatedPostDto=this.postService.updatePost(postDto,postId);
        return new ResponseEntity<PostDto>(updatedPostDto,HttpStatus.OK);
    }

    //search
    @GetMapping("/posts/search/{keywords}")
    public ResponseEntity<List<PostDto>> searchByTitle(@PathVariable("keywords") String keywords )
    {
        List<PostDto> postDtos=this.postService.searchPosts(keywords);
        return new ResponseEntity<List<PostDto>>(postDtos,HttpStatus.OK);
    }


}
