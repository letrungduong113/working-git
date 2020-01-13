package spring.boot.singleton.models.auth;

import lombok.Data;

@Data
public class LoginResponse {
    private Long userId;
    private String phoneNumber;
    private String token;
}
