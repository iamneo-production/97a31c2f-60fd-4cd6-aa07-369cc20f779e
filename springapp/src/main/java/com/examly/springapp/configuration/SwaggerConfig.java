package com.examly.springapp.configuration;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfig implements WebMvcConfigurer {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo()) // Set the API information
				.securityContexts(Arrays.asList(securityContext())) // Set the security contexts
				.securitySchemes(Arrays.asList(apiKey())) // Set the security schemes
				.select()
				.apis(RequestHandlerSelectors.any()) // Select all request handlers
				.paths(PathSelectors.any()) // Select all paths
				.build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfo(
				"Spring Boot API project for PG Admission Portal",
				"Web application to connect students with various institutes",
				"1.0",
				"Terms of service URL",
				new Contact("Prakash", "/", "prakasha.ece19@gmail.com"),
				"License of API",
				"API license URL",
				Collections.emptyList()); // Vendor extensions (empty in this case)
	}

	private ApiKey apiKey() {
		// Created security scheme with the name "JWT", using the "Authorization" header
		return new ApiKey("JWT", "Authorization", "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder()
				.securityReferences(List.of(defaultAuth())) // Set the default authorization reference
				.operationSelector(o -> o.requestMappingPattern().matches("/.*")) // Select all operations
				.build();
	}

	private SecurityReference defaultAuth() {
		return SecurityReference.builder()
				.scopes(new AuthorizationScope[0]) // Set empty scopes
				.reference("JWT") // Reference the "JWT" security scheme
				.build();
	}
}
