package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.models.*;
import com.examly.springapp.service.authenticationService.*;

import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
	private AuthService  authService;

    @PostMapping("/admin/signup")
	private ResponseEntity<?> saveAdmin(@RequestBody UserModel userModel  ) {
		return authService.saveAdmin(userModel);
	}
	
	@PostMapping("/user/signup")
	private ResponseEntity<?> saveUser(@RequestBody UserModel userModel) {
		return authService.saveUser(userModel);
	}
	
	@PostMapping("/admin/login")
	public ResponseEntity<?> authenticateAdmin(@RequestBody LoginModel loginModel){
		return authService.login(loginModel);
	}
	
	@PostMapping("/user/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginModel loginModel) {
		return authService.login(loginModel);
	}

	//below all are for demo purpose it will be removed later complete on project

	@PostMapping("/admin/addInstitute")
	public ResponseEntity<?> addInstitute() {
		return ResponseEntity.ok("added institute");
	}
	@PutMapping("/admin/editInstitute")
	public ResponseEntity<?> editInstitute() {
		return ResponseEntity.ok("edited institute");
	}
	@GetMapping("/admin/viewInstitutes")
	public ResponseEntity<?> viewInstitute() {
		return ResponseEntity.ok("viewed institute");
	}

}
