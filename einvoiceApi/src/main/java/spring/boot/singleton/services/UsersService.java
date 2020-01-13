package spring.boot.singleton.services;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.boot.singleton.models.Role;
import spring.boot.singleton.repositories.UserRepository;
import spring.boot.singleton.models.User;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersService {
    @Autowired
    private UserRepository userRepository;

    public List<Object> getListUsers() {
        return userRepository.findAll().stream().map(u -> {
            return new UserInfo(u.getId(), u.getName(), u.getUsername(), u.getEmail(), u.getRole());
        }).collect(Collectors.toList());
    }

    public UserInfo getUser(Long id) {
        User u = this.userRepository.getOne(id);
        return new UserInfo(u.getId(), u.getName(), u.getUsername(), u.getEmail(), u.getRole());
    }

    @Data
    class UserInfo {
        private Long id;
        private String name;
        private String username;
        private String email;
        private Role role;

        public UserInfo(Long id, String name, String username, String email, Role role) {
            this.id = id;
            this.name = name;
            this.username = username;
            this.email = email;
            this.role = role;
        }
    }

}
