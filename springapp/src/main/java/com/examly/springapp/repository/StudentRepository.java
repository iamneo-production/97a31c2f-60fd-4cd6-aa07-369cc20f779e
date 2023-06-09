package com.examly.springapp.repository;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Repository
public interface StudentRepository extends JpaRepository<StudentModel,Integer> {

    List<StudentModel> findAll(); 
    Optional<StudentModel> findByStudentId(Integer id);
}