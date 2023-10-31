package com.rohit.blogappapis.repositories;

import com.rohit.blogappapis.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Integer> {
}
