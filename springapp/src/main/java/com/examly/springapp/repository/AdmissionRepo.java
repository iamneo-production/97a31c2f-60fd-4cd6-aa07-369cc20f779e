package com.examly.springapp.repository;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Repository
public interface AdmissionRepo extends JpaRepository<AdmissionModel,Integer> {

    List<AdmissionModel> findAll(); 
    Optional<AdmissionModel> findById(Integer id);
    AdmissionModel findByStudentIdNumber(Integer id);
    void deleteById(Integer id);
    Optional<AdmissionModel> findByStudentIdNumberAndCourseId(Integer studentIdNumber,Integer courseId);
    List<AdmissionModel> findByStatus(String status);

}
