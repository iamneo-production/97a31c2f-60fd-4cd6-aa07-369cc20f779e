package com.examly.springapp.repository;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;



@Repository
<<<<<<< HEAD:springapp/src/main/java/com/examly/springapp/repository/ReviewRepository.java
public interface ReviewRepository extends JpaRepository<ReviewModel, String> {
    List<ReviewModel> findAll(); 
=======
public interface ReviewRepository extends JpaRepository<ReviewModel, Long> {
    List<ReviewModel> findAll();

>>>>>>> f22cb4aa351f0e9bea9199623809ffbd40f673c6:springapp/src/main/java/com/examly/springapp/repository/reviewRepository.java

}
