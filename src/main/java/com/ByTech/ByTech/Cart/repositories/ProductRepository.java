package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.ArrayList;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    ArrayList<Product> findByCategoryAndIdNot(String category, Long ProductId);
    ArrayList<Product> findFirst4ByOrderByPriceAsc();
    ArrayList<Product> findByCategory(String category);
    @Query("SELECT SUM(p.unidades) FROM Product p WHERE FUNCTION('MONTH', p.date) = :month AND p.fabricante = :enterpriseId")
    Long findByMonthAndEnterpriseId(@Param("month") int month, @Param("enterpriseId") Long enterpriseId);

    List<Product> findByFabricante(Long enterprise_id);


}
