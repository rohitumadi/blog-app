package com.rohit.blogappapis.controllers;

import com.rohit.blogappapis.payloads.ApiResponse;
import com.rohit.blogappapis.payloads.CommentDto;
import com.rohit.blogappapis.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController()
@RequestMapping("/api/v1")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/post/{postId}/comments")
    public ResponseEntity<CommentDto> createComment(@PathVariable Integer postId, @RequestBody CommentDto comment)
    {
        CommentDto newComment=this.commentService.createComment(comment,postId);
        return new ResponseEntity<CommentDto>(newComment, HttpStatus.CREATED);

    }

    @GetMapping("/post/{postId}/comments")
    public ResponseEntity<Set<CommentDto>> getCommentByPostId(@PathVariable Integer postId)
    {
        return new ResponseEntity<Set<CommentDto>>(this.commentService.getCommentByPostId(postId),HttpStatus.OK);
    }

    @DeleteMapping ("/post/{commentId}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable Integer commentId)
    {
        this.commentService.deleteComment(commentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("comment deleted",true), HttpStatus.OK);

    }

}
