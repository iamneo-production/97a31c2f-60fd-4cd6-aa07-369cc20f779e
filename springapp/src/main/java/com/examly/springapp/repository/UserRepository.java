package com.examly.springapp.repository;

import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface UserRepository extends JpaRepository<UserModel, Integer> {

    List<UserModel> findAll();

    UserModel findUserById(String id);

    Optional<UserModel> findByEmail(String email);

    Optional<UserModel> findByUsername(String userName);

    boolean existsByEmail(String email);

    UserModel deleteByEmail(String email);

}
