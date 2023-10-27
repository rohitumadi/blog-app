package com.rohit.blogappapis.repositories;

import com.rohit.blogappapis.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
