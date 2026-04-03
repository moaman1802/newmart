package com.newmart.controller;

import com.newmart.model.User;
import com.newmart.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {
        Optional<User> loggedUser = service.login(user.getEmail(), user.getPassword());

        if(loggedUser.isPresent()) {
            return loggedUser.get();
        } else {
            return "Invalid Credentials";
        }
    }
}