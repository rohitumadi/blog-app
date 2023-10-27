package com.rohit.blogappapis.repositories;

import com.rohit.blogappapis.entities.Category;
import com.rohit.blogappapis.entities.Post;
import com.rohit.blogappapis.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Integer> {
    Page<Post> findByUser(Pageable p,User user);
    Page<Post> findByCategory(Pageable p, Category category);
    List<Post> findByTitleContaining(String title);
// this will also work ,in older versions of spring data jpa above method did not work
//    @Query("select p from Post p where p.title like :key")
//    List<Post> findByTitleContaining(@Param("key") String title);
}
