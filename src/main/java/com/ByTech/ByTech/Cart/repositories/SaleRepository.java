package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale,String> {
    List<Sale> findByClient_UserName(String userName);
}