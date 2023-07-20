package com.examly.springapp.repository;

import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface StudentRepository extends JpaRepository<StudentModel, Integer> {

    List<StudentModel> findAll();

    Optional<StudentModel> findByStudentId(Integer id);
}