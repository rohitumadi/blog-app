package com.rohit.blogappapis.payloads;

import lombok.Data;

@Data
public class JwtAuthResponse {
    private String token;
    private UserDto userDto;
}
