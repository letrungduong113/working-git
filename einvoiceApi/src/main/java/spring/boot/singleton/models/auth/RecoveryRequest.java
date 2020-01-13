package spring.boot.singleton.models.auth;

import lombok.Data;

@Data
public class RecoveryRequest {
    private String email;
    private String password;
    private String confPassword;
    private String code;
}
