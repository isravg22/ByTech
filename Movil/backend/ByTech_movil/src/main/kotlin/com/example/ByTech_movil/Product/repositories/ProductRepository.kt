package com.example.ByTech_movil.Product.repositories

import com.example.ByTech_movil.Product.models.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface ProductRepository : JpaRepository<Product?, Long?> {
    fun findByCategoryAndIdNot(category: String?, ProductId: Long?): ArrayList<Product?>?
    fun findFirst4ByOrderByPriceAsc(): ArrayList<Product?>?
    fun findByCategory(category: String?): ArrayList<Product?>?

    @Query("SELECT SUM(p.unidades) FROM Product p WHERE FUNCTION('MONTH', p.date) = :month AND p.fabricante = :enterpriseId")
    fun findByMonthAndEnterpriseId(
        @Param("month") month: Int,
        @Param("enterpriseId") enterpriseId: Long?
    ): Long?

    fun findByFabricante(enterprise_id: Long?): List<Product?>?
}
