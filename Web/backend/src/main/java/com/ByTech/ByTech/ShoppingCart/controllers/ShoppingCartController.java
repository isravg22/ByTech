package com.ByTech.ByTech.ShoppingCart.controllers;

import com.ByTech.ByTech.ShoppingCart.models.ShoppingCart;
import com.ByTech.ByTech.ShoppingCart.services.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ByTech.ByTech.Message.Message;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@RestController
@RequestMapping("/shoppingList")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
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

    @GetMapping("/user/{userName}")
    public ResponseEntity<List<ShoppingCart>> getShoppingCartByUser(@PathVariable("userName") String userName) {
        List<ShoppingCart> shoppingCart = this.shoppingCartService.getListByClient(userName);
        return new ResponseEntity<>(shoppingCart, HttpStatus.OK);
    }

    @PostMapping(path = "/addProductToList")
    public ResponseEntity<Message> addProduct(@RequestBody ShoppingCart shoppingCart,
                                              BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Revise los campos"), HttpStatus.BAD_REQUEST);

        return shoppingCartService.addProduct(shoppingCart);
    }

    @PutMapping("/updateProductQuantity/{id}")
    public ResponseEntity<Message> updateProductQuantity(
            @RequestBody ShoppingCart shoppingCart,
            @PathVariable("id") Long id) {
        ShoppingCart existingItem = this.shoppingCartService.findById(id);
        if (existingItem != null) {
            existingItem.setAmount(shoppingCart.getAmount());
            this.shoppingCartService.updateProduct(existingItem);
            return new ResponseEntity<>(new Message("Cantidad de producto actualizada"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Message("El producto no está en el carrito"), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/clean/{item_id}")
    public ResponseEntity<Message> removeProduct(@PathVariable("item_id")Long id){
        this.shoppingCartService.removeProduct(id);
        return new ResponseEntity<>(new Message("Eliminado"),HttpStatus.OK);
    }

    @PutMapping(path = "{id}")
    public ShoppingCart updateUserById(@RequestBody ShoppingCart request , @PathVariable("id") Long id){
        return this.shoppingCartService.updateByID(request, id);
    }



}