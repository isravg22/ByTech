package com.ByTech.ByTech.Sales.controllers;

import com.ByTech.ByTech.Sales.models.Sale;
import com.ByTech.ByTech.Sales.services.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sale")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class SaleController {

    private final SaleService saleService;

    @Autowired
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping("/client/{userName}")
    public ResponseEntity<List<Sale>> getByClient(@PathVariable String userName) {
        return new ResponseEntity<>(this.saleService.getSalesByClient(userName), HttpStatus.OK);
    }

    @PostMapping(path = "/create/{userName}")
    public ResponseEntity<Sale> createSale(@PathVariable String userName) {
        Sale sale = this.saleService.createSale(userName);
        return new ResponseEntity<>(sale, HttpStatus.OK);
    }

    @GetMapping("/month/{month}")
    public ResponseEntity<List<Sale>> getByMonth(@PathVariable int month) {
        return new ResponseEntity<>(this.saleService.getSalesByMonth(month), HttpStatus.OK);
    }
}
