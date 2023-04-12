package com.examly.springapp.services.authenticationService;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.ERole;
import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.securityConfig.JwtUtils;
import com.examly.springapp.security.securityServices.UserDetailsImpl;

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
        if (userRepository.existsByEmail(userModel.getEmail())) {
			return ResponseEntity.badRequest()
								 .body("Error: Email is already in use!");
		}
		UserModel user = UserModel.builder()
				.email(userModel.getEmail())
				.username(userModel.getUsername())
				.mobileNumber(userModel.getMobileNumber())
				.userRole(ERole.user)
				.password(encoder.encode(userModel.getPassword()))
				.build();
		
		return ResponseEntity.ok(userRepository.save(user));
    }

    @Override
    public ResponseEntity<?> saveAdmin(UserModel userModel) {
        if (userRepository.existsByEmail(userModel.getEmail())) {
			return ResponseEntity.badRequest()
								 .body("Error: Email is already in use!");
		}
		UserModel user = UserModel.builder()
				.email(userModel.getEmail())
				.username(userModel.getUsername())
				.mobileNumber(userModel.getMobileNumber())
				.userRole(ERole.admin)
				.password(encoder.encode(userModel.getPassword()))
				.build();

		return ResponseEntity.ok(userRepository.save(user));
    }

    @Override
    public ResponseEntity<?> login(LoginModel loginModel) {
        UserModel userModel = userRepository.findByEmail(loginModel.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException(USER_NAME_NOT_FOUND_EXCEPTION));
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginModel.getEmail(),loginModel.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication) ;
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		HashMap<String, Object> outResponse = new HashMap<>();
		outResponse.put("token", jwt);
		outResponse.put("type", "Bearer");
		outResponse.put("username", userDetails.getUsername());
		outResponse.put("email", userModel.getEmail());
		outResponse.put("roles", roles);
		return ResponseEntity.ok( outResponse );	
    }

    
    
}
