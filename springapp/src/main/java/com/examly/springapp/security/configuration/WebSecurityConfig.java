package com.examly.springapp.security.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.examly.springapp.security.services.UserDetailsServiceImpl;

// configuration for the web security
@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {

	@Autowired
	UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private AuthEntryPoint unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticatioJwTokenFilter() {
		return new AuthTokenFilter();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsServiceImpl);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authconfig) throws Exception {
		return authconfig.getAuthenticationManager();
	}

	private static final String[] PUBLIC_URLS = { "/user/login/**", "/user/signup/**", "/admin/signup/**",
			"/admin/login/**", "/swagger-ui/**", "/v2/api-docs", "/v3/api-docs", "/swagger-resources/**", "/webjars/**",
			"/swagger-ui.html", "/configuration/ui", "/configuration/**", "/admin/institute", "/admin/courses",
			"/admin/student", "/admin/admission", };

	// bean for the security filter chain
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		// Configure the HttpSecurity
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.authorizeHttpRequests().antMatchers(PUBLIC_URLS).permitAll()
			.anyRequest().authenticated();

		// Set the authentication provider and JWT token filter for the HttpSecurity object
		http.authenticationProvider(authenticationProvider());
		http.addFilterBefore(authenticatioJwTokenFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

}