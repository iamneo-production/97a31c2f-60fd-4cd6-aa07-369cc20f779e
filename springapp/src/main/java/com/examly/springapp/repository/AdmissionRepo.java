package com.examly.springapp.repository;

import com.examly.springapp.models.*;

import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface AdmissionRepo extends JpaRepository<AdmissionModel, Integer> {

    List<AdmissionModel> findAll();

    Optional<AdmissionModel> findById(Integer id);

    AdmissionModel findByStudentIdNumber(Integer id);

    void deleteById(Integer id);

    Optional<AdmissionModel> findByStudentIdNumberAndCourseId(Integer studentIdNumber, Integer courseId);

    List<AdmissionModel> findByStatus(String status);

}
