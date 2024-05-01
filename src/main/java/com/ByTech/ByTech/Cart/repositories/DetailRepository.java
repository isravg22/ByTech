package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailRepository extends JpaRepository<Detail, String> {
    List<Detail> findBySale_Id(String saleId);
}