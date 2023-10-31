package com.rohit.blogappapis.services;

import com.rohit.blogappapis.payloads.CommentDto;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto, Integer PostId);
    void deleteComment(Integer commentId);
}
