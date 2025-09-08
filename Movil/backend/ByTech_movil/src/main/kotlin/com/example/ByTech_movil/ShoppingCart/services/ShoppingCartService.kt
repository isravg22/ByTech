package com.example.ByTech_movil.ShoppingCart.services

import com.example.ByTech_movil.Message.Message
import com.example.ByTech_movil.ShoppingCart.models.ShoppingCart
import com.example.ByTech_movil.ShoppingCart.repositories.ShoppingCartRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.List

@Service
@Transactional
class ShoppingCartService @Autowired constructor(shoppingCartRepository: ShoppingCartRepository) {
    private val shoppingCartRepository: ShoppingCartRepository = shoppingCartRepository

    fun getListByClient(userName: String?): List<ShoppingCart> {
        return shoppingCartRepository.findByClient_UserName(userName)
    }

    fun findByClientAndProduct(userName: String?, productId: Long?): ShoppingCart? {
        return shoppingCartRepository.findByClient_UserNameAndProduct_Id(userName, productId)
    }

    fun cleanShoppingCart(clientId: Long?) {
        shoppingCartRepository.deleteByClient_Id(clientId)
    }

    fun removeProduct(id: Long?) {
        if (id != null) shoppingCartRepository.deleteById(id)
    }

    fun addProduct(shoppingCart: ShoppingCart): ResponseEntity<Message> {
        val existingItem = findByClientAndProduct(
            shoppingCart.client?.userName,
            shoppingCart.product?.id
        )

        return if (existingItem != null) {
            existingItem.amount += shoppingCart.amount
            updateProduct(existingItem)
            println("Cantidad de producto actualizada: ${existingItem.amount}")
            return ResponseEntity(Message("Cantidad de producto actualizada"), HttpStatus.OK)
        } else {
            addNewProduct(shoppingCart)
            println("Producto agregado al carrito: ${shoppingCart.product?.name} - Cantidad: ${shoppingCart.amount}")
            return ResponseEntity(Message("Producto agregado al carrito"), HttpStatus.OK)
        }
    }

    private fun addNewProduct(shoppingCart: ShoppingCart) {
        shoppingCartRepository.save(shoppingCart)
    }

    fun updateProduct(shoppingCart: ShoppingCart) {
        shoppingCartRepository.save(shoppingCart)
    }

    fun getCountByClient(clientId: Long?): Long {
        return shoppingCartRepository.countByClient_Id(clientId)
    }

    fun updateByID(request: ShoppingCart, id: Long?): ShoppingCart? {
        val shoppingCart = id?.let { shoppingCartRepository.findById(it).orElse(null) }
        if (shoppingCart != null) {
            shoppingCart.amount = request.amount
            shoppingCart.client = request.client
            shoppingCart.product = request.product
            shoppingCartRepository.save(shoppingCart)
        }
        return shoppingCart
    }

    fun findById(id: Long?): ShoppingCart? {
        return id?.let { shoppingCartRepository.findById(it).orElse(null) }
    }
}
