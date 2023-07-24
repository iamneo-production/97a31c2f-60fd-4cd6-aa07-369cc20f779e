package com.examly.springapp.service;

import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

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

    public boolean deleteTask(Long id) {
        try {
            Optional<ReviewModel> optionalReview = repo.findById(id);
            if (optionalReview.isPresent()) {
                repo.deleteById(id);

                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}
