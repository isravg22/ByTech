package com.ByTech.ByTech.Product.repositories;

import com.ByTech.ByTech.Product.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface ProductRepository extends JpaRepository<Product,Long> {
    ArrayList<Product> findByCategoryAndIdNot(String category, Long ProductId);
    ArrayList<Product> findFirst4ByOrderByPriceAsc();
    ArrayList<Product> findByCategory(String category);
    @Query("SELECT SUM(p.unidades) FROM Product p WHERE FUNCTION('MONTH', p.date) = :month AND p.fabricante = :enterpriseId")
    Long findByMonthAndEnterpriseId(@Param("month") int month, @Param("enterpriseId") Long enterpriseId);

    List<Product> findByFabricante(Long enterprise_id);

    // Unidades vendidas por mes (asumiendo que tienes un campo 'vendidas' y 'date')
    @Query("SELECT new map(FUNCTION('MONTH', p.date) as mes, SUM(p.vendidas) as cantidad) FROM Product p WHERE p.fabricante = :enterpriseId GROUP BY FUNCTION('MONTH', p.date) ORDER BY mes")
    List<Map<String, Object>> findVendidasPorMes(@Param("enterpriseId") Long enterpriseId);

    // Total de unidades restantes
    @Query("SELECT SUM(p.unidades) FROM Product p WHERE p.fabricante = :enterpriseId")
    Long findTotalRestantes(@Param("enterpriseId") Long enterpriseId);

    // Total de dinero conseguido (asumiendo que tienes un campo 'vendidas' y 'price')
    @Query("SELECT SUM(p.vendidas * p.price) FROM Product p WHERE p.fabricante = :enterpriseId")
    Double findTotalDinero(@Param("enterpriseId") Long enterpriseId);

    // Dinero conseguido por mes
    @Query("SELECT new map(FUNCTION('MONTH', p.date) as mes, SUM(p.vendidas * p.price) as cantidad) FROM Product p WHERE p.fabricante = :enterpriseId GROUP BY FUNCTION('MONTH', p.date) ORDER BY mes")
    List<Map<String, Object>> findDineroPorMes(@Param("enterpriseId") Long enterpriseId);
}
