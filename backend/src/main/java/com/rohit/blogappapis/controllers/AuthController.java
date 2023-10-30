package com.rohit.blogappapis.controllers;


import com.rohit.blogappapis.payloads.JwtAuthRequest;
import com.rohit.blogappapis.payloads.JwtAuthResponse;
import com.rohit.blogappapis.security.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
    private AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request){
        System.out.println("in login controller");
        this.authenticate(request.getUsername(),request.getPassword());
        UserDetails user=this.userDetailsService.loadUserByUsername(request.getUsername());
        String token =this.jwtTokenHelper.generateToken(user);
        JwtAuthResponse response=new JwtAuthResponse();
        response.setToken(token);
        System.out.println("token: " + token);
        return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);


    }

    private void authenticate(String username, String password) {

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        this.authenticationManager.authenticate(token);

    }

}
