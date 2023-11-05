package com.rohit.blogappapis.controllers;

import com.rohit.blogappapis.config.AppConstants;
import com.rohit.blogappapis.payloads.ApiResponse;
import com.rohit.blogappapis.payloads.PostDto;
import com.rohit.blogappapis.payloads.PostResponse;
import com.rohit.blogappapis.services.FileService;
import com.rohit.blogappapis.services.PostService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto,
                                              @PathVariable Integer userId,
                                              @PathVariable Integer categoryId) {

        PostDto newPost=this.postService.createPost(postDto, userId, categoryId);
        return  new ResponseEntity<PostDto>(newPost, HttpStatus.CREATED);
    }

    @GetMapping("/category/{categoryId}/posts")
    public  ResponseEntity<PostResponse> getPostsByCategory(@RequestParam(value = "pageNumber", defaultValue =AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
                                                            @RequestParam(value = "pageSize", defaultValue =AppConstants.PAGE_SIZE,required = false) Integer pageSize,@PathVariable Integer categoryId)
    {
        PostResponse posts=this
                .postService
                .getPostsByCategory(pageNumber, pageSize,categoryId);
        return new ResponseEntity<PostResponse>(posts,HttpStatus.OK);

    }
    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<PostResponse> getPostsByUser(@RequestParam(value = "pageNumber", defaultValue =AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
                                                        @RequestParam(value = "pageSize", defaultValue =AppConstants.PAGE_SIZE,required = false) Integer pageSize,@PathVariable Integer userId)
    {
        PostResponse posts=this.postService.getPostsByUser(pageNumber, pageSize,userId);
        return new ResponseEntity<PostResponse>(posts,HttpStatus.OK);
    }
    @GetMapping("/posts")
    public ResponseEntity<PostResponse> getAllPosts(@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
                                                    @RequestParam(value = "pageSize", defaultValue =AppConstants.PAGE_SIZE,required = false) Integer pageSize,
                                                    @RequestParam(value = "sortBy", defaultValue =AppConstants.SORT_BY,required = false) String sortBy,
                                                    @RequestParam(value = "sortDir", defaultValue =AppConstants.SORT_DIR,required = false) String sortDir
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

    @PostMapping("/post/image/upload/{postId}")
    public ResponseEntity<PostDto> uploadPostImage(@PathVariable Integer postId,
            @RequestParam MultipartFile image) throws IOException {
        PostDto postDto=this.postService.getPostById(postId);
        String fileName=this.fileService.uploadImage(path,image);
        postDto.setImageName(fileName);
        PostDto updatedPost=this.postService.updatePost(postDto,postId);
        return new ResponseEntity<PostDto>(updatedPost,HttpStatus.OK);

    }
@GetMapping(value = "/post/image/{imageName}",produces = MediaType.IMAGE_PNG_VALUE)
    public void downloadImage(@PathVariable String imageName,
                              HttpServletResponse response) throws IOException {
    InputStream resource=this.fileService.getResource(path,imageName);
    response.setContentType(MediaType.IMAGE_PNG_VALUE);
    StreamUtils.copy(resource,response.getOutputStream());

    }


}
