package com.rohit.blogappapis.repositories;

import com.rohit.blogappapis.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
   @Query("SELECT c FROM Comment c WHERE c.post.postId = :postId")
   Set<Comment> findByPostId(@Param("postId") Integer postId);

}
