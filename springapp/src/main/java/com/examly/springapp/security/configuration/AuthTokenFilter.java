package com.examly.springapp.security.configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.examly.springapp.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils jwtUtils; // to interact with JWT token

	@Autowired
	private UserDetailsServiceImpl userDetailsService; // to load user details

	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

	// Extract JWT token from Authorization header
	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");
		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());
		}
		return null;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwtString = parseJwt(request); // get JWT token from request header

			if (jwtString != null && jwtUtils.validateJwtToken(jwtString)) { // check if token is valid and not null
				String username = jwtUtils.getUserNameFromJwtToken(jwtString); // get the username from the token
				UserDetails userDetails = userDetailsService.loadUserByUsername(username); // load user details by
																							// username

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities()); // create an authentication object with the
																			// user details
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); // set the
																										// authentication
																										// details
				SecurityContextHolder.getContext().setAuthentication(authentication); // set the authentication object
																						// in the security context

			}
		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e);
		}

		filterChain.doFilter(request, response); // pass the request and response to the next filter in the chain
	}
}
