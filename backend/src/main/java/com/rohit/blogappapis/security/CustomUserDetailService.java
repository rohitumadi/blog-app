package com.rohit.blogappapis.security;

import com.rohit.blogappapis.entities.User;
import com.rohit.blogappapis.exceptions.ResourceNotFoundException;
import com.rohit.blogappapis.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //loading user from db by username(email)
        User user=this.userRepository.findByEmail(username).orElseThrow(()->new ResourceNotFoundException("User","email :"+username,0));


        return user;
    }
}
