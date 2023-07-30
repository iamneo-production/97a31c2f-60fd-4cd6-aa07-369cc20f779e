package com.examly.springapp.security.configuration;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.examly.springapp.security.services.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {

	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${project.app.jwtSecret}")
	private String jwtSecret;

	@Value("${project.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	// Generate a JWT token using the authentication object
	public String generateJwtToken(Authentication authentication) {

		// Get the authenticated user details
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		// Build the JWT token with user's username, issue date, expiration time, and
		// the secret key
		return Jwts.builder()
				.setSubject(userPrincipal.getUsername())
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	// Extract the username from a JWT token
	public String getUserNameFromJwtToken(String token) {
		// Parse the token to get the claims, and return the subject (username) from the
		// claims
		return Jwts.parser()
			   .setSigningKey(jwtSecret)
			   .parseClaimsJws(token).getBody().getSubject();
	}

	// Validate a JWT token
	public boolean validateJwtToken(String authToken) {
		try {
			// Parse the token and verify the signature using the secret key
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			// If there is no exception, the token is valid
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}

		// If there is any exception, the token is invalid
		return false;
	}

}