package com.examly.springapp.service.authenticationService;

import org.springframework.http.ResponseEntity;

import com.examly.springapp.models.LoginModel;
import com.examly.springapp.models.UserModel;

public interface AuthService {

    public ResponseEntity<?> saveUser(UserModel userModel);

    public ResponseEntity<?> saveAdmin(UserModel userModel);
    
    public ResponseEntity<?> login(LoginModel loginModel);

}