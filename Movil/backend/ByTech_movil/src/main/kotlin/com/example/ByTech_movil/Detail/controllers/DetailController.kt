package com.example.ByTech_movil.Detail.controllers

import com.example.ByTech_movil.Detail.models.Detail
import com.example.ByTech_movil.Detail.services.DetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/saleDetail")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:3001"])
class DetailController @Autowired constructor(detailService: DetailService) {
    private val detailService: DetailService = detailService

    @GetMapping("/{sale_id}")
    fun getDetailsBySale(@PathVariable("sale_id") id: Long?): ResponseEntity<List<Detail?>> {
        return  ResponseEntity<List<Detail?>>(detailService.getDetailBySale(id), HttpStatus.OK)
    }
}
