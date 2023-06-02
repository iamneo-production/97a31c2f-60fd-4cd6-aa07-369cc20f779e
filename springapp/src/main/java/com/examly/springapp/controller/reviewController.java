package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;

import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;


@RestController
public class reviewController {
		
	@Autowired
	private reviewService ser;
	
	// To save task
		@PostMapping("/user/addFeedback")
		public ResponseEntity<?> addTaskById(@RequestBody reviewModel mod) {
			reviewModel taskObj = ser.addTask(mod);
			
			if(taskObj == null)
				return	new ResponseEntity<String>("FeedBack not saved", HttpStatus.BAD_REQUEST);
			
			return	new ResponseEntity<reviewModel>(taskObj, HttpStatus.CREATED);
		}
		
		// To Get a all task
		@GetMapping("/user/getAllFeedback")
		public ResponseEntity<List<reviewModel>> getTask() {

			return	new ResponseEntity<List<reviewModel>>(ser.getTask(), HttpStatus.OK);
		}
}
