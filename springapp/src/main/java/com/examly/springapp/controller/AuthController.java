package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import com.examly.springapp.service.authenticationService.*;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@RequestMapping("/")

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

}
