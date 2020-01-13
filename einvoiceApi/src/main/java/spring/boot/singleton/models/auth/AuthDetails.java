package spring.boot.singleton.models.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import spring.boot.singleton.models.User;

import java.util.Collection;
import java.util.Collections;

@Data
@AllArgsConstructor
public class AuthDetails implements UserDetails {
    User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority role;
        switch (user.getRole()) {
            case ROLE_ROOT: role = new SimpleGrantedAuthority("ROLE_ROOT");
                break;
            case ROLE_ADMIN: role = new SimpleGrantedAuthority("ROLE_ADMIN");
                break;
            case ROLE_USER: role = new SimpleGrantedAuthority("ROLE_USER");
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + user.getRole());
        }
        return Collections.singleton(role);
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
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

    public User getUser() {
        return this.user;
    }
}
