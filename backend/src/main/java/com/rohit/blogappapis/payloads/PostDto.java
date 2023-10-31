package com.rohit.blogappapis.payloads;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class PostDto {
    private Integer postId;
    @NotEmpty
    private String title;
    @NotEmpty
    private String content;

    private Date DateCreated;

    private String imageName;

    private CategoryDto category;
    private UserDto user;
    private Set<CommentDto> comments=new HashSet<>();


}
