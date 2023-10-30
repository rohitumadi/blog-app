package com.rohit.blogappapis.payloads;


import lombok.Data;

@Data
public class JwtAuthRequest {
    private String username;//this is email
    private String password;
}
