package com.rohit.blogappapis.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserDto {
    private int id;

    @NotEmpty
    @Size(min = 4,message = "Username must be greater than 4 characters")
    private String name;
    @Email(message = "Email is not valid")
    private String email;
    @NotEmpty
    @Size(min = 4,message = "Password must be greater than 4 characters")
    private String password;
    @NotEmpty
    private String about;
}
