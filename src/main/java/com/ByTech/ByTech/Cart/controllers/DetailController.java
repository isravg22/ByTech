package com.ByTech.ByTech.Cart.controllers;

import com.ByTech.ByTech.Cart.models.Detail;
import com.ByTech.ByTech.Cart.services.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saleDetail")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class DetailController {

    private final DetailService detailService;

    @Autowired
    public DetailController(DetailService detailService) {
        this.detailService = detailService;
    }

    @GetMapping("/{sale_id}")
    public ResponseEntity<List<Detail>> getDetailsBySale(@PathVariable("sale_id")Long id){
        return new ResponseEntity<>(this.detailService.getDetailBySale(id), HttpStatus.OK);
    }
}
