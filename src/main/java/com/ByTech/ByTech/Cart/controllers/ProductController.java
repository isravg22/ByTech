package com.ByTech.ByTech.Cart.controllers;

import com.ByTech.ByTech.Cart.models.Message;
import com.ByTech.ByTech.Cart.models.Product;
import com.ByTech.ByTech.Cart.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Object> getProductos(){
        ArrayList<Product> productos = this.productService.getProductos();
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<Object> getProductById(@PathVariable("product_id") String productId) {
        Optional<Product> productOptional = productService.getProductById(productId);
        if (productOptional.isPresent()) {
            return new ResponseEntity<>(productOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Message("No encontrado"), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/best")
    public ResponseEntity<Object> getBestProducts(){
        ArrayList<Product> bestProducts = this.productService.getBestPriceProducts();
        return new ResponseEntity<>(bestProducts,HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Message> createProduct(@RequestBody Product product, BindingResult bindingResult){
        if (bindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Revise los campos"),HttpStatus.BAD_REQUEST);
        this.productService.saveProduct(product);
        return new ResponseEntity<>(new Message("Creado correctamente"),HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Message> updateProduct(@RequestBody Product product, BindingResult bindingResult){
        if (bindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Revise los campos"),HttpStatus.BAD_REQUEST);
        this.productService.saveProduct(product);
        return new ResponseEntity<>(new Message("Actualizado correctamente"),HttpStatus.OK);
    }

    @GetMapping("/type/{category}")
    public ResponseEntity<Object> getProductByCategory(@PathVariable("category") String category) {
        ArrayList<Product> productsByCategory = this.productService.getProductByCategory(category);
        return new ResponseEntity<>(productsByCategory, HttpStatus.OK);
    }
}
