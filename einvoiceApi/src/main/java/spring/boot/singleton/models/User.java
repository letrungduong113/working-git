package spring.boot.singleton.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @Column(nullable = false, unique = true)
    private String username;
    private String password;
    private String email;
    private Role role;
    private String recovery;
}