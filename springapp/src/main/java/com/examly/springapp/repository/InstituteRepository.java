package com.examly.springapp.repository;

import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface InstituteRepository extends JpaRepository<InstituteModel, Integer> {

    List<InstituteModel> findAll();

    Optional<InstituteModel> findByInstituteId(Integer id);

    void deleteById(Integer id);
}
