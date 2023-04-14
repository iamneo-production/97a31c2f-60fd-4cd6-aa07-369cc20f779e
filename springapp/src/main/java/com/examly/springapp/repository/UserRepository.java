package com.examly.springapp.repository;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import java.util.*;
@Repository
public interface UserRepository extends JpaRepository<UserModel,Integer> {

    List<UserModel> findAll(); 
    UserModel findUserById(String id);
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByUsername(String userName);
    boolean existsByEmail(String email);
    UserModel deleteByEmail(String email);

}
