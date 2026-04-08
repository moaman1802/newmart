package com.newmart.controller;

import com.newmart.config.JwtUtil;
import com.newmart.dto.AuthResponse;
import com.newmart.dto.LoginRequest;
import com.newmart.model.User;
import com.newmart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User newUser = userService.register(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            // Email already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        var user = userService.login(request.getEmail(), request.getPassword());
        if (user.isPresent()) {
            String token = jwtUtil.generateToken(user.get().getEmail());
            AuthResponse response = new AuthResponse(token, user.get().getEmail(), user.get().getName());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}