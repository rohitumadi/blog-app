package com.rohit.blogappapis.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id
    private int role_id;

    private String role;
}
