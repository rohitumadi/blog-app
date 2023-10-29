package com.rohit.blogappapis.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer postId;


    @Column(name = "post_title",nullable = false,length = 30)
    private String title;

    private String content;

    private String imageName;

    private Date dateCreated;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    private User user;

//    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
//    private Set<Comment> comments=new HashSet<>();//one post will have many comments



}
