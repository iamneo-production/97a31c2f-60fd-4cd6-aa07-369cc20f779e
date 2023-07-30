package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.review.ReviewService;
import com.examly.springapp.models.*;

import org.springframework.http.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReviewController {

	@Autowired
	private ReviewService ser;

	// To save task
	@PostMapping("/user/addFeedback")
	public ResponseEntity<?> addTaskById(@RequestBody ReviewModel mod) {
		ReviewModel taskObj = ser.addTask(mod);

		if (taskObj == null)
			return new ResponseEntity<String>("FeedBack not saved", HttpStatus.BAD_REQUEST);

		return new ResponseEntity<ReviewModel>(taskObj, HttpStatus.CREATED);
	}

	// To Get a all task
	@GetMapping("/user/getAllFeedback")
	public ResponseEntity<List<ReviewModel>> getTask() {

		return new ResponseEntity<>(ser.getTask(), HttpStatus.OK);
	}

	@DeleteMapping("/admin/deleteFeedback/{id}")
	public String deleteEmployeeById(@PathVariable Long id) {
		if (ser.deleteTask(id)) {
			return "Feedback Removed of id: " + id;
		}

		return "internal server error";
	}
}