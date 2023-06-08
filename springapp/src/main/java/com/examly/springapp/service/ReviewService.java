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
public class ReviewService {
	
	@Autowired
	private ReviewRepository repo;
	
	public ReviewModel addTask(ReviewModel mod) {
		try {
			return repo.save(mod);
		} catch (Exception e) {
			return null;
		}	
	}
	
	public List<ReviewModel> getTask() {
		return repo.findAll();
	}
	public boolean deleteTask(String id) {
		try {
			if(this.getTaskById(id)!=null)
				repo.deleteById(id);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
	}

}
