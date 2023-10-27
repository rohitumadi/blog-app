package com.rohit.blogappapis.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Data
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;
    @Column(name = "title" ,length=30,nullable = false)
    private String categoryTitle;
    @Column(name = "description")
    private String categoryDescription;

    //cascade all will delete/add all children if parent is deleted/added
    //fetch is for getting parent only not child
    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Set<Post> posts=new HashSet<>();
}
