package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    List<ShoppingCart> findByClient_UserName(String clientEmail);
    ShoppingCart findByClient_UserNameAndProduct_Id(String clientEmail, Long productId);
    ShoppingCart findByProduct_IdAndClient_UserName(Long productId, String clientEmail);
    void deleteByClient_Id(Long clientId);
    Long countByClient_Id(Long clientId);

}
