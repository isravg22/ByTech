package com.example.ByTech_movil.ShoppingCart.repositories

import com.example.ByTech_movil.ShoppingCart.models.ShoppingCart
import org.springframework.data.jpa.repository.JpaRepository

interface ShoppingCartRepository : JpaRepository<ShoppingCart?, Long?> {
    fun findByClient_UserName(clientEmail: String?): List<ShoppingCart?>?
    fun findByClient_UserNameAndProduct_Id(clientEmail: String?, productId: Long?): ShoppingCart?
    fun findByProduct_IdAndClient_UserName(productId: Long?, clientEmail: String?): ShoppingCart?
    fun deleteByClient_Id(clientId: Long?)
    fun countByClient_Id(clientId: Long?): Long?
}
