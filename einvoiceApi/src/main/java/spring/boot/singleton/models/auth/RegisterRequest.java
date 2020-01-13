package spring.boot.singleton.models.auth;

import lombok.Data;
import spring.boot.singleton.models.Role;

@Data
public class RegisterRequest {
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private String confPassword;
    private Role role;
}
