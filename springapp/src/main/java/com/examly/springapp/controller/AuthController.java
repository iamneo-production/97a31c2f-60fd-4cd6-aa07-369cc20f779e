package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.service.*;
import com.examly.springapp.service.authenticationService.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;
import javax.security.auth.spi.LoginModule;


@RestController
@RequestMapping("/")
// @ResponseBody
public class AuthController {

	@Autowired
    private LoginService loginService;
	@Autowired
    private AuthService  authService;

	@CrossOrigin
    @GetMapping("/login")
    public List<LoginModel> getAllUsers(){
        return loginService.getAllUsers();
    }

    @CrossOrigin
    @PostMapping("/admin/signup")
	private ResponseEntity<?> saveAdmin(@RequestBody UserModel userModel  ) {
		return authService.saveAdmin(userModel);
	}
	
	@CrossOrigin
	@PostMapping("/user/signup")
	private ResponseEntity<?> saveUser(@RequestBody UserModel userModel) {
		return authService.saveUser(userModel);
	}
	
	@CrossOrigin
	@PostMapping("/admin/login")
	public ResponseEntity<?> authenticateAdmin(@RequestBody LoginModel loginModel){
		return authService.login(loginModel);
	}
	
	@CrossOrigin
	@PostMapping("/user/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginModel loginModel) {
		return authService.login(loginModel);
	}

}
