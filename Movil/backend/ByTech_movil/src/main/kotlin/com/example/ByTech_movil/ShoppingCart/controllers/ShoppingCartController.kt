package com.example.ByTech_movil.ShoppingCart.controllers

import com.example.ByTech_movil.ShoppingCart.models.ShoppingCart
import com.example.ByTech_movil.ShoppingCart.services.ShoppingCartService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import com.example.ByTech_movil.Message.Message
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import java.util.List

@RestController
@RequestMapping("/shoppingList")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class ShoppingCartController @Autowired constructor(
    private val shoppingCartService: ShoppingCartService
) {

    @GetMapping
    fun listByClient(): ResponseEntity<List<ShoppingCart>> {
        val authentication: Authentication = SecurityContextHolder.getContext().authentication
        return if (authentication.principal is UserDetails) {
            val userName: String = (authentication.principal as UserDetails).username
            ResponseEntity(shoppingCartService.getListByClient(userName), HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }


    @GetMapping("/count/{client_id}")
    fun countByClient(@PathVariable("client_id") id: Long?): ResponseEntity<Long> {
        return ResponseEntity(shoppingCartService.getCountByClient(id), HttpStatus.OK)
    }

    @GetMapping("/user/{userName}")
    fun getShoppingCartByUser(@PathVariable("userName") userName: String?): ResponseEntity<List<ShoppingCart>> {
        val shoppingCart = shoppingCartService.getListByClient(userName)
        return ResponseEntity(shoppingCart, HttpStatus.OK)
    }

    @PostMapping(path= ["/addProductToList"])
    fun addProduct(
        @RequestBody shoppingCart: ShoppingCart,
        bindingResult: BindingResult
    ): ResponseEntity<Message> {
        if (bindingResult.hasErrors()) return ResponseEntity(Message("Revise los campos"),HttpStatus.BAD_REQUEST)

        return shoppingCartService.addProduct(shoppingCart)
    }

    @PutMapping("/updateProductQuantity/{id}")
    fun updateProductQuantity(
        @RequestBody shoppingCart: ShoppingCart,
        @PathVariable("id") id: Long?
    ): ResponseEntity<Message> {
        val existingItem = shoppingCartService.findById(id)
        return if (existingItem != null) {
            existingItem.amount = shoppingCart.amount
            shoppingCartService.updateProduct(existingItem)
            ResponseEntity(Message("Cantidad de producto actualizada"), HttpStatus.OK)
        } else {
            ResponseEntity(Message("El producto no está en el carrito"), HttpStatus.NOT_FOUND)
        }

    }

    @DeleteMapping("/clean/{item_id}")
    fun removeProduct(@PathVariable("item_id") id: Long?): ResponseEntity<Message> {
        shoppingCartService.removeProduct(id)
        return ResponseEntity(Message("Eliminado"), HttpStatus.OK)
    }

    @PutMapping(value = ["{id}"])

    fun updateUserById(
        @RequestBody request: ShoppingCart,
        @PathVariable("id") id: Long?
    ): ResponseEntity<Any> {
        val updated = shoppingCartService.updateByID(request, id)
        return if (updated != null) {
            ResponseEntity(updated, HttpStatus.OK)
        } else {
            ResponseEntity(Message("No se encontró el carrito con ese ID"), HttpStatus.NOT_FOUND)
        }
    }


}