package com.ByTech.ByTech.Cart.repositories;

import com.ByTech.ByTech.Cart.models.Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DetailRepository extends JpaRepository<Detail, Long> {
    List<Detail> findBySale_Id(Long saleId);

    @Query("SELECT SUM(s.amount) FROM Sale s WHERE FUNCTION('MONTH', s.date) = :month AND s.fabricante = :enterpriseId")
    Long findByMonthAndEnterpriseId(@Param("month") int month, @Param("enterpriseId") Long amount);
}
