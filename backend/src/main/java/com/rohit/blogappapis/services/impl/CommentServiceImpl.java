package com.rohit.blogappapis.services.impl;

import com.rohit.blogappapis.entities.Comment;
import com.rohit.blogappapis.entities.Post;
import com.rohit.blogappapis.exceptions.ResourceNotFoundException;
import com.rohit.blogappapis.payloads.CommentDto;
import com.rohit.blogappapis.repositories.CommentRepository;
import com.rohit.blogappapis.repositories.PostRepository;
import com.rohit.blogappapis.services.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ModelMapper modelMapper;
    @Override
    public CommentDto createComment(CommentDto commentDto, Integer postId) {
        Post post =this.postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post","postId",postId));
        Comment comment = this.dtoToComment(commentDto);
        comment.setPost(post);
        Comment savedComment=this.commentRepository.save(comment);
        return this.commentToDto(savedComment);
    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment comment = this.commentRepository.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment","commentId",commentId));
        this.commentRepository.delete(comment);

    }

    public Comment dtoToComment(CommentDto commentDto)
    {
        Comment comment=this.modelMapper.map(commentDto, Comment.class);
        return comment;

    }
    public CommentDto commentToDto(Comment comment)
    {
        CommentDto commentDto =this.modelMapper.map(comment,CommentDto.class);
        return commentDto;
    }
}
