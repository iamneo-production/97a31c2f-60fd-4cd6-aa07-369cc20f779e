package com.examly.springapp.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.examly.springapp.model.ERole;
import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.services.authenticationService.AuthService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AuthService authService;
	
	private static final String USER_NAME_NOT_FOUND_EXCEPTION = "User email not found in database";
	
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
	@GetMapping("/demo")
	public String demo() {
		return "home page";
	}
	
	@GetMapping("/dashboard")
	public ResponseEntity<?> dashboard(Principal principal) {
		UserModel userModel = userRepository.findByEmail(principal.getName())
				.orElseThrow(() -> new UsernameNotFoundException(USER_NAME_NOT_FOUND_EXCEPTION));
		if (!userModel.getUserRole().equals(ERole.admin)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN)
					.body("You are not authorized to access this resource.");
		}
		return ResponseEntity.ok("dashboard page");
	}

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
