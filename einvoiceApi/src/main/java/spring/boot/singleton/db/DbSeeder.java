package spring.boot.singleton.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import spring.boot.singleton.models.Role;
import spring.boot.singleton.models.User;
import spring.boot.singleton.repositories.UserRepository;

@Component
public class DbSeeder {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedUsersTable();
    }

    private void seedUsersTable() {
        if(userRepository.count() == 0) {
            User user = new User();
            user.setName("admin");
            user.setUsername("0987654321");
            user.setEmail("buiphuongaptutc@gmail.com");
            user.setPassword(passwordEncoder.encode("123456"));
            user.setRole(Role.ROLE_USER);
            userRepository.save(user);
        }
    }
}
