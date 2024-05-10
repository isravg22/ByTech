package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product,String> {
    ArrayList<Product> findByCategoryAndIdNot(String category, Long ProductId);
    ArrayList<Product> findFirst4ByOrderByPriceAsc();
    ArrayList<Product> findByCategory(String category);
}