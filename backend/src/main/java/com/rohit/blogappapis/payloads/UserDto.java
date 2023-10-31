package com.rohit.blogappapis.payloads;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Data
public class UserDto {
    private int id;

    @NotEmpty
    @Size(min = 4,message = "Username must be greater than 4 characters")
    private String name;
    @NotEmpty
    @Email(message = "Email is not valid")
    private String email;
    @NotEmpty
    //@JsonIgnore                 //To Hide Password, but it Will ignore for both GET(Marshalling) and POST(UnMarshalling)
//    private String password;
    //another way to handle password is ignore password in getter method
    //@JsonIgnore
    //public String getPassword(){return this.password;}


    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)        //To hide password only for Marshalling
    @Size(min = 4,message = "Password must be greater than 4 characters")
    private String password;
    @NotEmpty
    private String about;

    private Set<RoleDto> roles=new HashSet<>();
}
