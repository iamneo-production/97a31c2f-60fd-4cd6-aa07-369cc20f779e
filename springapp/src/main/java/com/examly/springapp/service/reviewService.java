package com.examly.springapp.service;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;
import javax.lang.model.type.NullType;

@Service
public class reviewService {
	
	@Autowired
	private reviewRepository repo;
	
	public reviewModel addTask(reviewModel mod) {
		try {
			return repo.save(mod);
		} catch (Exception e) {
			return null;
		}	
	}
	
	public List<reviewModel> getTask() {
		return repo.findAll();
	}

}
