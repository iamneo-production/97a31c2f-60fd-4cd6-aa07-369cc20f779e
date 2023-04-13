package com.examly.springapp.repository;
import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import java.util.*;

@Repository
public interface CourseRepository extends JpaRepository<CourseModel,Integer> {

    List<CourseModel> findAll(); 
    Optional<CourseModel> findBycourseId(Integer id);
    void deleteById(Integer id);
    
}

