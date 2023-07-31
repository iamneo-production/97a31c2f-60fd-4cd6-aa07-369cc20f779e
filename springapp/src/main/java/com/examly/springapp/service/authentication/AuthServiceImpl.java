package com.examly.springapp.service.authentication;

import java.security.Principal;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.models.UserModel;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.configuration.JwtUtils;
import com.examly.springapp.dto.ERole;
import com.examly.springapp.dto.LoginRequest;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	AuthenticationManager authenticationManager;

	private static final String USER_NAME_NOT_FOUND_EXCEPTION = "User email not found in database";

	@Override
	public ResponseEntity<?> saveUser(UserModel userModel) {
		// Check if email is already in use
		if (userRepository.existsByEmail(userModel.getEmail())) {
			HashMap<String, Object> outResponse = new HashMap<>();
			outResponse.put("message", "Email is already in use!");
			return ResponseEntity.ok().body(outResponse);
		}

		// Create new user and set attributes
		UserModel user = new UserModel();
		user.setEmail(userModel.getEmail());
		user.setUsername(userModel.getUsername());
		user.setMobileNumber(userModel.getMobileNumber());
		user.setUserRole(ERole.USER);
		user.setPassword(encoder.encode(userModel.getPassword()));

		// Save user to the database and return response
		return ResponseEntity.ok(userRepository.save(user));
	}

	@Override
	public ResponseEntity<?> saveAdmin(UserModel userModel) {
		// Check if email is already in use
		if (userRepository.existsByEmail(userModel.getEmail())) {
			HashMap<String, Object> outResponse = new HashMap<>();
			outResponse.put("message", "Email is already in use!");
			return ResponseEntity.badRequest().body(outResponse);
		}

		// Create new user and set attributes
		UserModel user = new UserModel();
		user.setEmail(userModel.getEmail());
		user.setUsername(userModel.getUsername());
		user.setMobileNumber(userModel.getMobileNumber());
		user.setUserRole(ERole.ADMIN);
		user.setPassword(encoder.encode(userModel.getPassword()));

		// Save user to the database and return response
		return ResponseEntity.ok(userRepository.save(user));
	}

	@Override
	public ResponseEntity<?> login(LoginRequest loginModel) {
		// Find user by email or throw exception if not found
		UserModel userModel = userRepository.findByEmail(loginModel.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException(USER_NAME_NOT_FOUND_EXCEPTION));

		// Authenticate user using email and password and set the authentication to the
		// SecurityContextHolder
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginModel.getEmail(), loginModel.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Generate JWT token and set the user details and roles to the response
		String jwt = jwtUtils.generateJwtToken(authentication);

		HashMap<String, Object> outResponse = new HashMap<>();
		outResponse.put("token", jwt);
		outResponse.put("id", userModel.getId());
		outResponse.put("username", userModel.getUsername());
		outResponse.put("email", userModel.getEmail());
		outResponse.put("roles", userModel.getUserRole());
		outResponse.put("status", 200);

		// Return response with token and user details
		return ResponseEntity.ok(outResponse);
	}

	@Override
	public ResponseEntity<?> getUserDetails(Principal principal) {
		// Find user by email or throw exception if not found
		UserModel userModel = userRepository.findByEmail(principal.getName())
				.orElseThrow(() -> new UsernameNotFoundException(USER_NAME_NOT_FOUND_EXCEPTION));

		// Set the user details and roles to the response
		HashMap<String, Object> outResponse = new HashMap<>();
		outResponse.put("id", userModel.getId());
		outResponse.put("username", userModel.getUsername());
		outResponse.put("email", userModel.getEmail());
		outResponse.put("roles", userModel.getUserRole());
		outResponse.put("status", 200);

		// Return response with token and user details
		return ResponseEntity.ok(outResponse);
	}

}