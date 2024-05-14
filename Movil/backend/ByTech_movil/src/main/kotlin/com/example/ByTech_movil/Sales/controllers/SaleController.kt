package com.example.ByTech_movil.Sales.controllers

import com.example.ByTech_movil.Sales.models.Sale
import com.example.ByTech_movil.Sales.services.SaleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/sale")
@CrossOrigin(origins = [ "exp://192.168.0.247:8081"])
class SaleController @Autowired constructor(private val saleService: SaleService) {
    @GetMapping("/client/{userName}")
    fun getByClient(@PathVariable userName: String?): ResponseEntity<List<Sale?>> {
        return ResponseEntity(saleService.getSalesByClient(userName), HttpStatus.OK)
    }

    @PostMapping(path = ["/create/{userName}"])
    fun createSale(@PathVariable userName: String?): ResponseEntity<Sale> {
        val sale = saleService.createSale(userName!!)
        return ResponseEntity(sale, HttpStatus.OK)
    }

    @GetMapping("/month/{month}")
    fun getByMonth(@PathVariable month: Int): ResponseEntity<List<Sale?>> {
        return ResponseEntity(saleService.getSalesByMonth(month), HttpStatus.OK)
    }
}
