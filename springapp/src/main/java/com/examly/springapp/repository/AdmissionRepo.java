package com.examly.springapp.repository;

import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import java.util.*;

@Repository
public interface AdmissionRepo extends JpaRepository<AdmissionModel,Integer> {

    List<AdmissionModel> findAll(); 
    Optional<AdmissionModel> findById(Integer id);
    void deleteById(Integer id);
}
