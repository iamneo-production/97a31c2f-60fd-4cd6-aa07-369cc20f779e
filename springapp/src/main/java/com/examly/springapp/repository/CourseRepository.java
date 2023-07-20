package com.examly.springapp.repository;

import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface CourseRepository extends JpaRepository<CourseModel, Integer> {

    List<CourseModel> findAll();

    Optional<CourseModel> findBycourseId(Integer id);

    void deleteById(Integer id);

    boolean existsByCourseId(Integer id);

}
