package com.example.ByTech_movil.Sales.repositories

import com.example.ByTech_movil.Sales.models.Sale
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface SaleRepository : JpaRepository<Sale, Long> {
    fun findByClient_UserName(userName: String): List<Sale>

    @Query("SELECT s FROM Sale s WHERE MONTH(s.date) = :month")
    fun findByMonth(@Param("month") month: Int): List<Sale>
}
