package spring.boot.singleton.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.boot.singleton.services.UsersService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<Object> getUsers() {
        return usersService.getListUsers();
    }

    @GetMapping("/users/{id}")
    public Object getUser(@PathVariable("id") Long id) {
        return usersService.getUser(id);
    }
}
