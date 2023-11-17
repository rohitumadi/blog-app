package com.rohit.blogappapis.services;

import com.rohit.blogappapis.payloads.CommentDto;

import java.util.Set;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto, Integer PostId);
    void deleteComment(Integer commentId);
    Set<CommentDto> getCommentByPostId(Integer postId);
}
