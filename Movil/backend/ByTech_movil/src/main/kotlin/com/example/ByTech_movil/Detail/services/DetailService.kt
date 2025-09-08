package com.example.ByTech_movil.Detail.services

import com.example.ByTech_movil.Detail.models.Detail
import com.example.ByTech_movil.Detail.repositories.DetailRepository
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
@Transactional
class DetailService @Autowired constructor(private val detailRepository: DetailRepository) {

    fun createDetail(detail: Detail?) {
        detail?.let { detailRepository.save(it) }
    }

    fun getDetailBySale(saleId: Long?): List<Detail> {
        return detailRepository.findBySale_Id(saleId)
    }
}
