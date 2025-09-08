package com.example.ByTech_movil.Product.repositories

import com.example.ByTech_movil.Product.models.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProductRepository : JpaRepository<Product, Long> {

    fun findByCategoryAndIdNot(category: String, productId: Long): ArrayList<Product>?

    fun findFirst4ByOrderByPriceAsc(): ArrayList<Product>?

    fun findByCategory(category: String): ArrayList<Product>?

    @Query("SELECT SUM(p.unidades) FROM Product p WHERE FUNCTION('MONTH', p.date) = :month AND p.fabricante = :enterpriseId")
    fun findByMonthAndEnterpriseId(
        @Param("month") month: Int,
        @Param("enterpriseId") enterpriseId: Long
    ): Long?

    fun findByFabricante(enterpriseId: Long): List<Product>?

    @Query("SELECT new map(FUNCTION('MONTH', p.date) as mes, SUM(p.vendidas) as cantidad) FROM Product p WHERE p.fabricante = :enterpriseId GROUP BY FUNCTION('MONTH', p.date) ORDER BY mes")
    fun findVendidasPorMes(@Param("enterpriseId") enterpriseId: Long): List<Map<String, Any>>?

    @Query("SELECT SUM(p.unidades) FROM Product p WHERE p.fabricante = :enterpriseId")
    fun findTotalRestantes(@Param("enterpriseId") enterpriseId: Long): Long?

    @Query("SELECT SUM(p.vendidas * p.price) FROM Product p WHERE p.fabricante = :enterpriseId")
    fun findTotalDinero(@Param("enterpriseId") enterpriseId: Long): Double?

    @Query("SELECT new map(FUNCTION('MONTH', p.date) as mes, SUM(p.vendidas * p.price) as cantidad) FROM Product p WHERE p.fabricante = :enterpriseId GROUP BY FUNCTION('MONTH', p.date) ORDER BY mes")
    fun findDineroPorMes(@Param("enterpriseId") enterpriseId: Long): List<Map<String, Any>>?

    @Query("SELECT SUM(p.registradas) FROM Product p WHERE p.fabricante = :enterpriseId")
    fun findTotalRegistradas(@Param("enterpriseId") enterpriseId: Long): Long?

    @Query("SELECT new map(FUNCTION('MONTH', p.date) as mes, SUM(p.registradas) as cantidad) FROM Product p WHERE p.fabricante = :enterpriseId GROUP BY FUNCTION('MONTH', p.date) ORDER BY mes")
    fun findRegistradasPorMes(@Param("enterpriseId") enterpriseId: Long): List<Map<String, Any>>?
}
