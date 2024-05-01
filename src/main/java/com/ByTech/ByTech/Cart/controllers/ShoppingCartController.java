package com.ByTech.ByTech.Cart.controllers;

import com.ByTech.ByTech.Cart.models.ShoppingCart;
import com.ByTech.ByTech.Cart.services.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ByTech.ByTech.Cart.models.Message;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@RestController
@RequestMapping("/shoppingList")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping()
    public ResponseEntity<List<ShoppingCart>> getListByClient() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            String userName = ((UserDetails) authentication.getPrincipal()).getUsername();
            return new ResponseEntity<>(this.shoppingCartService.getListByClient(userName), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/count/{client_id}")
    public ResponseEntity<Long> countByClient(@PathVariable("client_id")Long id){
        return new ResponseEntity<>(this.shoppingCartService.getCountByClient(id),HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<Message> addProduct( @RequestBody ShoppingCart shoppingCart,
                                              BindingResult bindingResult){
        if (bindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Revise los campos"), HttpStatus.BAD_REQUEST);
        this.shoppingCartService.addProduct(shoppingCart);
        return new ResponseEntity<>(new Message("Producto agregado"),HttpStatus.OK);
    }
    @DeleteMapping("/clean/{item_id}")
    public ResponseEntity<Message> removeProduct(@PathVariable("item_id")String id){
        this.shoppingCartService.removeProduct(id);
        return new ResponseEntity<>(new Message("Eliminado"),HttpStatus.OK);
    }
}