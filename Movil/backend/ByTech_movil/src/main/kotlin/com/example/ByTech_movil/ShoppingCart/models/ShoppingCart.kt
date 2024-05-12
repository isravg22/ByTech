package com.example.ByTech_movil.ShoppingCart.models

import com.example.ByTech_movil.User.models.UserModel
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne

@Entity
class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne(optional = false, cascade = [CascadeType.DETACH], fetch = FetchType.EAGER)
    @JoinColumn(
        name = "product_id",
        referencedColumnName = "id"
    ) // Aquí es donde se establece la relación correcta
    var product: com.example.ByTech_movil.Product.models.Product? = null

    @ManyToOne(optional = false, cascade = [CascadeType.DETACH], fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    var client: UserModel? = null

    @Column
    var amount: Int = 0
}