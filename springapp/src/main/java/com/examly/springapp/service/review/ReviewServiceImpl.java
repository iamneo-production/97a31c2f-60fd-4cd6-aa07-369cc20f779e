package com.examly.springapp.service.review;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.models.ReviewModel;
import com.examly.springapp.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService{
    
    @Autowired
    private ReviewRepository repo;

    @Override
    public ReviewModel addTask(ReviewModel mod) {
        try {
            return repo.save(mod);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<ReviewModel> getTask() {
        return repo.findAll();
    }

    @Override
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
