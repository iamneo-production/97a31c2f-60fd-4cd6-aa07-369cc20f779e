package com.examly.springapp.repository;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Repository

public interface StudentformRepository extends JpaRepository<StudentformModel,Integer>{
    List<StudentformModel> findAll(); 
    StudentformModel findByStudentIdNumber(Integer id);
}