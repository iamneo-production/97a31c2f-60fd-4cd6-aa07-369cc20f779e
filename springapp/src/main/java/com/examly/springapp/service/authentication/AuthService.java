package com.examly.springapp.service.authentication;

import java.security.Principal;
import org.springframework.http.ResponseEntity;

import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.models.UserModel;

public interface AuthService {

    public ResponseEntity<?> saveUser(UserModel userModel);

    public ResponseEntity<?> saveAdmin(UserModel userModel);

    public ResponseEntity<?> login(LoginRequest loginRequest);

    public ResponseEntity<?> getUserDetails(Principal principal);

}