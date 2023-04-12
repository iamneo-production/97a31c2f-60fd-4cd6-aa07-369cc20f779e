package com.examly.springapp.services.authenticationService;

import org.springframework.http.ResponseEntity;

import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserModel;

public interface AuthService {

    public ResponseEntity<?> saveUser(UserModel userModel);

    public ResponseEntity<?> saveAdmin(UserModel userModel);
    
    public ResponseEntity<?> login(LoginModel loginModel);

}
