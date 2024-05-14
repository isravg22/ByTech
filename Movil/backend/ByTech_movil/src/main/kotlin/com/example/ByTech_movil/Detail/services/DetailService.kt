package com.example.ByTech_movil.Detail.services

import com.example.ByTech_movil.Detail.models.Detail
import com.example.ByTech_movil.Detail.repositories.DetailRepository
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
@Transactional
class DetailService @Autowired constructor(detailRepository: DetailRepository) {
    private val detailRepository: DetailRepository = detailRepository

    fun createDetail(detail: Detail?) {
        detailRepository.save<Detail>(detail!!)
    }

    fun getDetailBySale(saleId: Long?): List<Detail?> {
        return detailRepository.findBySale_Id(saleId)!!
    }
}
