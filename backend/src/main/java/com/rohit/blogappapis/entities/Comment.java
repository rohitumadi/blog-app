package com.rohit.blogappapis.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private String content;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private  Post post;//comment of which post
//    @ManyToOne
//    private User user;


}
