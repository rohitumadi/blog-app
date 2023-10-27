package com.rohit.blogappapis.controllers;

import com.rohit.blogappapis.payloads.ApiResponse;
import com.rohit.blogappapis.payloads.UserDto;
import com.rohit.blogappapis.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody @Valid UserDto userDto)
    {
        UserDto createdUserDto=this.userService.createUser(userDto);
        return new ResponseEntity<>(createdUserDto, HttpStatus.CREATED);

    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser( @RequestBody @Valid UserDto userDto,@PathVariable Integer userId) {
        UserDto updatedUserDto=this.userService.updateUser(userDto,userId);
        return  ResponseEntity.ok(updatedUserDto);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Integer userId)
    {
        this.userService.deleteUser(userId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("User Deleted",true),HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers()
    {
        List<UserDto> userDtoList=this.userService.getAllUser();
        return new ResponseEntity<List<UserDto>>(userDtoList,HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getAllUsers(@PathVariable Integer userId)
    {
        UserDto userDto=this.userService.getUserById(userId);
        return new ResponseEntity<UserDto>(userDto,HttpStatus.OK);
    }


}
