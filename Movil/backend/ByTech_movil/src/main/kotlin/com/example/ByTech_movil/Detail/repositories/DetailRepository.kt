package com.example.ByTech_movil.Detail.repositories

import com.example.ByTech_movil.Detail.models.Detail
import org.springframework.data.jpa.repository.JpaRepository

interface DetailRepository : JpaRepository<Detail, Long> {
    fun findBySale_Id(saleId: Long?): List<Detail>
}
