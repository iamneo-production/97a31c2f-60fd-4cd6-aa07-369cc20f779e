package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import com.examly.springapp.service.authentication.AuthService;
import com.examly.springapp.dto.LoginRequest;
import org.springframework.http.*;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/admin/signup")
	public ResponseEntity<?> saveAdmin(@RequestBody UserModel userModel) {
		return authService.saveAdmin(userModel);
	}

	@PostMapping("/user/signup")
	public ResponseEntity<?> saveUser(@RequestBody UserModel userModel) {
		return authService.saveUser(userModel);
	}

	@PostMapping("/admin/login")
	public ResponseEntity<?> authenticateAdmin(@RequestBody LoginRequest loginRequest) {
		return authService.login(loginRequest);
	}

	@PostMapping("/user/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		return authService.login(loginRequest);
	}

	@GetMapping("/details")
	public ResponseEntity<?> getUserDetails(Principal principal) {
		return authService.getUserDetails(principal);
	}

}
