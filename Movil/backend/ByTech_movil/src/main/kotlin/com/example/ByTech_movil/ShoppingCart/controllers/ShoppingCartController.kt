package com.example.ByTech_movil.ShoppingCart.controllers

import com.example.ByTech_movil.Message.Message
import com.example.ByTech_movil.ShoppingCart.models.ShoppingCart
import com.example.ByTech_movil.ShoppingCart.services.ShoppingCartService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/shoppingList")
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:3001"])
class ShoppingCartController @Autowired constructor(shoppingCartService: ShoppingCartService) {
    private val shoppingCartService: ShoppingCartService = shoppingCartService

    @get:GetMapping
    val listByClient: ResponseEntity<out Any?>
        get() {
            val authentication: Authentication =
                SecurityContextHolder.getContext().getAuthentication()
            if (authentication != null && authentication.principal is UserDetails) {
                val userName: String = (authentication.principal as UserDetails).username
                return ResponseEntity<Any?>(
                    shoppingCartService.getListByClient(userName),
                    HttpStatus.OK
                )
            } else {
                return ResponseEntity<List<ShoppingCart>>(HttpStatus.UNAUTHORIZED)
            }
        }

    @GetMapping("/count/{client_id}")
    fun countByClient(@PathVariable("client_id") id: Long?): ResponseEntity<Any?> {
        return ResponseEntity<Any?>(shoppingCartService.getCountByClient(id), HttpStatus.OK)
    }

    @GetMapping("/user/{userName}")
    fun getShoppingCartByUser(@PathVariable("userName") userName: String?): ResponseEntity<List<ShoppingCart>> {
        val shoppingCart: List<ShoppingCart> =
            shoppingCartService.getListByClient(userName) as List<ShoppingCart>
        return ResponseEntity<List<ShoppingCart>>(shoppingCart, HttpStatus.OK)
    }

    @PostMapping(path = ["/addProductToList"])
    fun addProduct(
        @RequestBody shoppingCart: ShoppingCart?,
        bindingResult: BindingResult
    ): ResponseEntity<Message> {
        if (bindingResult.hasErrors()) return ResponseEntity<Message>(
            Message("Revise los campos"),
            HttpStatus.BAD_REQUEST
        )

        return shoppingCartService.addProduct(shoppingCart!!)
    }

    @PutMapping("/updateProductQuantity/{id}")
    fun updateProductQuantity(
        @RequestBody shoppingCart: ShoppingCart,
        @PathVariable("id") id: Long?
    ): ResponseEntity<Message> {
        val existingItem: ShoppingCart? = shoppingCartService.findById(id)
        if (existingItem != null) {
            existingItem.amount=shoppingCart.amount
            shoppingCartService.updateProduct(existingItem)
            return ResponseEntity<Message>(
                Message("Cantidad de producto actualizada"),
                HttpStatus.OK
            )
        } else {
            return ResponseEntity<Message>(
                Message("El producto no está en el carrito"),
                HttpStatus.NOT_FOUND
            )
        }
    }

    @DeleteMapping("/clean/{item_id}")
    fun removeProduct(@PathVariable("item_id") id: Long?): ResponseEntity<Message> {
        shoppingCartService.removeProduct(id)
        return ResponseEntity<Message>(Message("Eliminado"), HttpStatus.OK)
    }

    @PutMapping(path = ["{id}"])
    fun updateUserById(
        @RequestBody request: ShoppingCart?,
        @PathVariable("id") id: Long?
    ): ShoppingCart? {
        return shoppingCartService.updateByID(request!!, id)
    }
}