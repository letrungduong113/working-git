package spring.boot.singleton.models.auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String phoneNumber;
    private String password;
}
