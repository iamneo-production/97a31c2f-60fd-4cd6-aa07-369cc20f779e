package com.examly.springapp.service.review;

import java.util.List;
import com.examly.springapp.models.ReviewModel;

public interface ReviewService {

    public ReviewModel addTask(ReviewModel mod);

    public List<ReviewModel> getTask();

    public boolean deleteTask(Long id);
}
