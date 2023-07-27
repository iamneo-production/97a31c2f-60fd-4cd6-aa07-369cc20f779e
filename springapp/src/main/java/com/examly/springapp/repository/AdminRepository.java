package com.examly.springapp.repository;

import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface AdminRepository extends JpaRepository<AdminModel, Integer> {

    List<AdminModel> findAll();

    AdminModel findUserById(Integer id);

    AdminModel findByEmail(String email);

    AdminModel deleteByEmail(String email);
}
