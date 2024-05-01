package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, String> {
    List<ShoppingCart> findByClient_Id(Long clientId);
    List<ShoppingCart> findByClient_UserName(String clientEmail);
    void deleteByClient_Id(Long clientId);
    Long countByClient_Id(Long clientId); // Changed parameter name to clientId
}
