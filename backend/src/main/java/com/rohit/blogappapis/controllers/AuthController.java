package com.rohit.blogappapis.controllers;


import com.rohit.blogappapis.exceptions.ApiException;
import com.rohit.blogappapis.payloads.JwtAuthRequest;
import com.rohit.blogappapis.payloads.JwtAuthResponse;
import com.rohit.blogappapis.payloads.UserDto;
import com.rohit.blogappapis.security.JwtTokenHelper;
import com.rohit.blogappapis.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request) throws Exception {
        System.out.println("in login controller");
        this.authenticate(request.getUsername(),request.getPassword());
        UserDetails user=this.userDetailsService.loadUserByUsername(request.getUsername());
        String token =this.jwtTokenHelper.generateToken(user);
        JwtAuthResponse response=new JwtAuthResponse();
        response.setToken(token);
        System.out.println("token: " + token);
        return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        try{

        this.authenticationManager.authenticate(token);
        }catch (BadCredentialsException e){
            System.out.println("Invalid credentials");
            throw new ApiException("Invalid credentials");
        }

    }

    //register new user
    @PostMapping("/signup")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto)
    {
        UserDto newUser=this.userService.registerNewUser(userDto);
        return new ResponseEntity<UserDto>(newUser,HttpStatus.CREATED);

    }

}
