package com.rohit.blogappapis.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_name",nullable = false, length =100)
    private String name;
    private String email;


    private String password;
    private String about;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch =FetchType.EAGER)
    private Set<Post> posts=new HashSet<>();

//    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//    private Set<Comment> comments=new HashSet<>();
        @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
        @JoinTable(name = "user_role",
        joinColumns =@JoinColumn(name = "user",referencedColumnName = "id"),
        inverseJoinColumns =@JoinColumn(name="role",referencedColumnName = "role_id"))
        private Set<Role> roles=new HashSet<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<SimpleGrantedAuthority> authories= this.roles
                .stream()
                .map((role) ->
                        new SimpleGrantedAuthority(role.getRole()))
                .toList();

        return authories;

    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
