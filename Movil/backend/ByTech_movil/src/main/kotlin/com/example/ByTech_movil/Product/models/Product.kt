package com.example.ByTech_movil.Product.models

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.Date

@Entity
@Table(name = "product")
class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column
    var name: String? = null

    @Column
    var price: Double? = null

    @Column
    var description: String? = null

    @Column
    var category: String? = null

    @Column
    var image: String? = null

    @Column
    var unidades: Long? = null

    @Column
    var fabricante: Long? = null

    @Column(columnDefinition = "DATE")
    var date: Date? = null
}