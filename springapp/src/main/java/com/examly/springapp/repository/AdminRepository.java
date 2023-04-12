package com.examly.springapp.repository;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;
@Repository
public interface AdminRepository extends JpaRepository<AdminModel,Integer> {

    List<AdminModel> findAll(); 
    AdminModel findUserById(Integer id);
    AdminModel findByEmail(String email);
    AdminModel deleteByEmail(String email);
}
