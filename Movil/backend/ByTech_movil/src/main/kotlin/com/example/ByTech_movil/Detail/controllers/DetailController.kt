package com.example.ByTech_movil.Detail.controllers

import com.example.ByTech_movil.Detail.models.Detail
import com.example.ByTech_movil.Detail.services.DetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/saleDetail")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class DetailController @Autowired constructor(private val detailService: DetailService) {

    @GetMapping("/{sale_id}")
    fun getDetailsBySale(@PathVariable("sale_id") id: Long?): ResponseEntity<List<Detail>> {
        return ResponseEntity(detailService.getDetailBySale(id), HttpStatus.OK)
    }
}
