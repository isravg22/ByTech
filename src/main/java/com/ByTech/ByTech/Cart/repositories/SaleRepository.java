package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale,Long> {
    List<Sale> findByClient_UserName(String userName);
    @Query("SELECT s FROM Sale s WHERE MONTH(s.date) = :month")
    List<Sale> findByMonth(@Param("month") int month);
}
