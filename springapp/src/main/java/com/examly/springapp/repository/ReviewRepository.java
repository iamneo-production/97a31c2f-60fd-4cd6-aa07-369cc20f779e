package com.examly.springapp.repository;

import com.examly.springapp.models.*;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface ReviewRepository extends JpaRepository<ReviewModel, Long> {
    List<ReviewModel> findAll();

}
