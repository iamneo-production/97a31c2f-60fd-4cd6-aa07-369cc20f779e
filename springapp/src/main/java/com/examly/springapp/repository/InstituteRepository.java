package com.examly.springapp.repository;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Repository
public interface InstituteRepository extends JpaRepository<InstituteModel,Integer> {

    List<InstituteModel> findAll(); 
    Optional<InstituteModel> findByInstituteId(Integer id);
    void deleteById(Integer id);
}

