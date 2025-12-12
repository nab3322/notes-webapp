package com.unibo.notes.dto.auth;

public class AuthResponse {
    public String token;
    public String username;
    public String email;
    public Long userId;

    public AuthResponse(String token, String username, String email, Long userId) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.userId = userId;
    }
}